import {AccountModel} from "@/lib/models/account.model";
import {compareSync, hashSync} from "bcryptjs";
import {Document} from "mongoose";
import mailingService from "@/lib/services/mailing.service";

class SecurityService {
  hashPassword(passwordText: string) {
    return hashSync(passwordText, 10);
  }
  validatePassword(rawText: string, hash: string) {
    return compareSync(rawText, hash);
  }
  async sendVerificationEmail(account: Document<Account>) {
    // TODO: send verification email
    mailingService.sendEmail();
    return {};
  }

  validateSignIn(email: string, password: string) {

  }

}

export default new SecurityService();
