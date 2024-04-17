import { AccountRegistrationData } from "@/lib/common/validations/account.validation";
import {
  AccountDocument,
  AccountModel,
  RoleEnum,
} from "@/lib/models/account.model";
import securityService from "@/lib/services/security.service";
import { FilterQuery, PaginateModel } from "mongoose";

export interface AccountQueries {
  page?: number;
  limit?: number;
  query?: string;
}

class AccountService {
  async createAccount(data: AccountRegistrationData, role?: RoleEnum) {
    const existing = await this.getAccountByEmail(data.email);
    if (existing) throw new Error("This email is already used");
    const account = await AccountModel.create({
      email: data.email,
      fullName: data.fullName,
      password: securityService.hashPassword(data.password),
      birthday: data.birthday,
      joinDate: new Date(),
      role: role || RoleEnum.USER,
      status: "unverified",
    });
    if (role !== RoleEnum.ADMIN) {
      // send verification email
      await securityService.sendVerificationEmail(account);
    }
    return account;
  }
  getAccountByEmail(email: string, withPassword: boolean = false) {
    return AccountModel.findOne({ email }).select(
      withPassword ? "+password" : ""
    );
  }

  async getAccountByGoogleId(googleId?: string | null) {
    return await AccountModel.findOne({ googleId });
  }

  async getAccountById(accountId: string): Promise<AccountDocument | null> {
    try {
      const account = await AccountModel.findById(accountId);
      return account;
    } catch (error: any) {
      throw new Error(`Error getting account: ${error.message}`);
    }
  }

  async updateAccount(
    accountId: string,
    updateData: Partial<AccountDocument>
  ): Promise<AccountDocument | null> {
    try {
      const updatedAccount = await AccountModel.findByIdAndUpdate(
        accountId,
        updateData,
        { new: true }
      );
      return updatedAccount;
    } catch (error: any) {
      throw new Error(`Error updating account: ${error.message}`);
    }
  }

  async deleteAccount(accountId: string): Promise<void> {
    try {
      await AccountModel.findByIdAndDelete(accountId);
    } catch (error: any) {
      throw new Error(`Error deleting account: ${error.message}`);
    }
  }

  async getAccounts(
    page: number,
    limit: number,
    query?: FilterQuery<AccountDocument>
  ) {
    try {
      const options = {
        page,
        limit,
      };

      const result = await (AccountModel as any).paginate(query, options);

      return {
        accounts: result.docs,
        totalPages: result.totalPages,
        totalDocs: result.totalDocs,
        page,
        limit,
      };
    } catch (error: any) {
      throw new Error(`Error getting accounts: ${error.message}`);
    }
  }

  async postAccount(payload: Account) {
    const existing = await this.getAccountByEmail(payload.email);
    if (existing) throw new Error("This email is already used");

    const account = await AccountModel.create({
      email: payload.email,
      fullName: payload.fullName,
      password: securityService.hashPassword("123456"),
      birthday: payload.birthday,
      joinDate: new Date(),
      role: payload.role || RoleEnum.USER,
      status: "unverified",
      identityNumber: payload.identityNumber,
      phoneNumber: payload.phoneNumber,
      gender: payload.gender,
      address: payload.address,
      balance: payload.balance,
      profilePicture: payload.profilePicture,
    });

    if (account.role !== RoleEnum.ADMIN) {
      // send verification email
      await securityService.sendVerificationEmail(account);
    }
    return account;
  }
}

export default new AccountService();
