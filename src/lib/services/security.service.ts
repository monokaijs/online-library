import {AccountModel} from "@/lib/models/account.model";
import {compareSync, hashSync} from "bcryptjs";
import {Document} from "mongoose";
import mailingService from "@/lib/services/mailing.service";
import accountService from "@/lib/services/account.service";

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

  async validateSignIn(email: string, password: string) {
    const account = await accountService.getAccountByEmail(email, true);
    if (!account) throw new Error("Invalid account");
    if (this.validatePassword(password, account.password)) {
      return account;
    } else throw new Error("Wrong password");
  }

}

export default new SecurityService();
