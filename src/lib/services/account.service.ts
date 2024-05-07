import { AccountRegistrationData } from "@/lib/common/validations/account.validation";
import {
  AccountDocument,
  AccountModel,
  RoleEnum,
} from "@/lib/models/account.model";
import { BorrowModel } from "@/lib/models/borrow.model";
import { borrowService } from "@/lib/services/borrow.service";
import securityService from "@/lib/services/security.service";
import { FilterQuery } from "mongoose";

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
      return JSON.parse(JSON.stringify(account));
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateAccount(
    accountId: string,
    updateData: Partial<AccountDocument>
  ): Promise<AccountDocument | null> {
    try {
      if (updateData.userId) {
        const userIdExisting = await AccountModel.countDocuments({
          userId: updateData.userId,
        });
        if (userIdExisting > 0) throw new Error("Mã người dùng đã tồn tại");
      }

      const updatedAccount = await AccountModel.findByIdAndUpdate(
        accountId,
        updateData,
        { new: true }
      );
      return updatedAccount;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteAccount(accountId: string): Promise<void> {
    try {
      await AccountModel.findByIdAndDelete(accountId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAccounts(page: number, limit: number, query?: any) {
    try {
      const options = {
        page,
        limit,
      };

      const filter: FilterQuery<AccountDocument> = {};

      if (query?.fullName) {
        filter.$or = [
          { fullName: { $regex: new RegExp(query.fullName, "i") } },
          { userId: { $regex: new RegExp(query.fullName, "i") } },
        ];
      }

      if (query?.role && query.role !== "all") {
        filter.role = query.role;
      }

      const result = await (AccountModel as any).paginate(filter, options);

      const accounts = JSON.parse(JSON.stringify(result.docs));
      for (const account of accounts) {
        const borrowedBooksCount = await BorrowModel.countDocuments({
          user: account._id,
        });
        account.totalBorrow = borrowedBooksCount;
      }

      return {
        accounts: accounts,
        totalPages: result.totalPages,
        totalDocs: result.totalDocs,
        page,
        limit,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async postAccount(payload: Account) {
    const existing = await this.getAccountByEmail(payload.email);
    if (existing) throw new Error("This email is already used");

    const userIdExisting = await AccountModel.find({ userId: payload.userId });
    if (userIdExisting) throw new Error("Mã người dùng đã tồn tại");

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

  async getAccountDetail(_id: string) {
    const account = await this.getAccountById(_id);
    const history = await borrowService.getAllByAccount(_id);
    return JSON.parse(
      JSON.stringify({
        account,
        history,
      })
    );
  }
}

export default new AccountService();
