'use server';
import {accountRegistrationValidationSchema} from "@/lib/validations/account.validation";
import accountService from "@/lib/services/account.service";
import {dbService} from "@/lib/services/db.service";
import securityService from "@/lib/services/security.service";


export interface RegisterState {
  success: boolean;
  message?: string;
}

export async function registerAction(prevState: RegisterState, form: any): Promise<RegisterState> {
  await dbService.connect();
  const validate = accountRegistrationValidationSchema.safeParse(form);
  if (validate.success) {
    // valid data
    try {
      const newAccount = await accountService.createAccount({
        email: form.email,
        password: form.password,
        birthday: form.birthday,
        fullName: form.fullName,
      });

      // send verification email
      await securityService.sendVerificationEmail(newAccount);

      return {
        success: true,
        message: 'Created successfully!',
      }
    } catch (e: any) {
      return {
        success: false,
        message: e.message,
      }
    }
  } else {
    return {
      success: false,
      message: validate.error.errors.at(0)?.message || "Unknown error",
    }
  }
}
