import {AccountDocument} from "@/lib/models/account.model";
import {compareSync, hashSync} from "bcryptjs";
import mailingService from "@/lib/services/mailing.service";
import accountService from "@/lib/services/account.service";
import {AccountVerificationTemplate} from "@/lib/mailing/templates/account.verification.template";
import {AccountVerificationModel} from "@/lib/models/account-verification.model";
import {randomString} from "@/lib/utils/string";
import {accountPasswordValidationSchema} from "@/lib/validations/account.validation";

class SecurityService {
  hashPassword(passwordText: string) {
    return hashSync(passwordText, 10);
  }

  validatePassword(rawText: string, hash: string) {
    return compareSync(rawText, hash);
  }

  async changePassword(account: AccountDocument, newPassword: string) {
    const validation = accountPasswordValidationSchema.safeParse(newPassword);
    if (validation.success) {
      account.password = this.hashPassword(newPassword);
      return account.save();
    } else {
      throw new Error(validation.error.message);
    }
  }

  async verifyAccount(code: string) {
    const record = await AccountVerificationModel.findOne({
      code,
    }).populate('account');
    if (!record) throw new Error("This verification link is expired or used");
    const account = await accountService.getAccountByEmail(record?.account?.email);
    if (!account) throw new Error("Failed to find verification data");
    account.status = 'verified';
    await account.save();
    await record.deleteOne();
    return true;
  }

  async sendVerificationEmail(account: AccountDocument) {
    const generatedCode = `${account._id}|${randomString(20)}|${new Date().getTime()}`; // surely unique
    await AccountVerificationModel.create({
      code: generatedCode,
      account: account._id
    });
    const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL || process.env.DEPLOYMENT_PATH}/auth/verify?code=${generatedCode}`;
    return await mailingService.sendEmail(account.email, 'Xác thực tài khoản D-Free Books của bạn', AccountVerificationTemplate(account, verificationUrl));
  }

  async validateSignIn(email: string, password: string) {
    const account = await accountService.getAccountByEmail(email, true);
    if (!account) throw new Error("Tài khoản không tồn tại");
    if (this.validatePassword(password, account.password)) {
      if (account.status !== 'verified') throw new Error("Tài khoản của bạn chưa được xác thực, vui lòng kiểm tra Email và xác thực trước.");
      return account;
    } else throw new Error("Sai mật khẩu");
  }

}

export default new SecurityService();
