import {AccountModel} from "@/lib/models/account.model";
import {compareSync, hashSync} from "bcryptjs";

class SecurityService {
  hashPassword(passwordText: string) {
    return hashSync(passwordText, 10);
  }
  validatePassword(rawText: string, hash: string) {
    return compareSync(rawText, hash);
  }

  validateSignIn(email: string, password: string) {

  }

}

export default new SecurityService();
