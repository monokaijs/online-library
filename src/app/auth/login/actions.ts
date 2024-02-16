'use server';
import {accountLoginValidationSchema} from "@/lib/validations/account.validation";
import {dbService} from "@/lib/services/db.service";
import securityService from "@/lib/services/security.service";
import {getSession} from "@/lib/utils/getSession";


export interface LoginState {
  success: boolean;
  message?: string;
}

export async function loginAction(prevState: LoginState, form: any): Promise<LoginState> {
  await dbService.connect();
  const session = await getSession();
  const validate = accountLoginValidationSchema.safeParse(form);
  if (validate.success) {
    // valid data
    try {
      const account = await securityService.validateSignIn(form.email, form.password);
      session.account = account.toJSON();
      session.signedIn = true;
      await session.save();
      return {
        success: true,
        message: "Login successfully"
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
