import {AccountRegistrationData} from "@/lib/common/validations/account.validation";
import {AccountModel, RoleEnum} from "@/lib/models/account.model";
import securityService from "@/lib/services/security.service";
import {AccountVerificationModel} from "@/lib/models/account-verification.model";
import {randomString} from "@/lib/utils/string";

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
      status: 'unverified'
    });
    if (role !== RoleEnum.ADMIN) {
      // send verification email
      await securityService.sendVerificationEmail(account);
    }
    return account;
  }
  getAccountByEmail(email: string, withPassword: boolean = false) {
    return AccountModel.findOne({email}).select(withPassword ? '+password': '');
  }

  async getAccountByGoogleId(googleId?: string | null) {
    return await AccountModel.findOne({ googleId });
  }

}

export default new AccountService();
