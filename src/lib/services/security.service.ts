import {AccountModel} from "@/lib/models/account.model";

class SecurityService {
  createAccount(account: Account) {
    return AccountModel.create(account);
  }
  validateSignIn(email: string, password: string) {

  }

}

export default new SecurityService();