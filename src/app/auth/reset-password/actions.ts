'use server';
import {dbService} from "@/lib/services/db.service";
import {getSession} from "@/lib/utils/getSession";


export interface LoginState {
  success: boolean;
  message?: string;
}

export async function ResetPasswordAction(prevState: LoginState, form: any): Promise<LoginState> {
  await dbService.connect();
  const session = await getSession();
  
  return {
    success: true,
    message: ''
  }
}
