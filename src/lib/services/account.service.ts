import {AccountRegistrationData} from "@/lib/validations/account.validation";
import {AccountModel, RoleEnum} from "@/lib/models/account.model";
import securityService from "@/lib/services/security.service";
import {dbService} from "@/lib/services/db.service";

class AccountService {
  async createAccount(data: AccountRegistrationData, role?: RoleEnum) {
    const existing = await this.getAccountByEmail(data.email);
    if (existing) throw new Error("This email is already used");
    return await AccountModel.create({
      email: data.email,
      fullName: data.fullName,
      password: securityService.hashPassword(data.password),
      birthday: data.birthday,
      joinDate: new Date(),
      role: role || RoleEnum.USER,
    });
  }
  getAccountByEmail(email: string, withPassword: boolean = false) {
    return AccountModel.findOne({email}).select(withPassword ? 'password': '');
  }
}

export default new AccountService();
