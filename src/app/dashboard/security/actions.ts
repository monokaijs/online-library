"use server";
import { appEnv } from "@/lib/configs/env";
import accountService from "@/lib/services/account.service";
import { dbService } from "@/lib/services/db.service";
import securityService from "@/lib/services/security.service";
import { getSession } from "@/lib/utils/getSession";
import { google, oauth2_v2 } from "googleapis";

export interface Response {
  success: boolean;
  message?: string;
  connected?: boolean;
}

export interface ConnectPayload {
  type: string;
  code: string;
}

export interface ChangePassPayload {
  oldPassword: string;
  newPassword: string;
}

export async function googleConnectAction(
  _: any,
  payload: ConnectPayload
): Promise<Response> {
  let userInfo: oauth2_v2.Schema$Userinfo;

  const { code } = payload;
  if (!code) {
    return {
      success: false,
      message: "UNAUTHENTICATED",
    };
  }
  await dbService.connect();

  const authClient = google.oauth2("v2");
  const client = new google.auth.OAuth2(
    appEnv.security.google.clientId,
    appEnv.security.google.clientSecret,
    appEnv.security.google.redirectURI
  );

  const { tokens } = await client.getToken(code);
  client.setCredentials(tokens);
  authClient.context._options.auth = client;
  userInfo = (await authClient.userinfo.get()).data;

  const session = await getSession();
  //FOR LOGIN
  if (!session.account) {
    const connectedAccount = await accountService.getAccountByGoogleId(
      userInfo.id
    );

    if (connectedAccount) {
      session.account = JSON.parse(JSON.stringify(connectedAccount));
      session.signedIn = true;
      await session.save();

      return {
        success: true,
        message: "Đăng nhập thành công",
        connected: true,
      };
    } else {
      return {
        success: false,
        message: "Tài khoản Google chưa được liên kết",
      };
    }
  }

  //FOR CONNECT
  await accountService.updateAccount(session?.account?._id, {
    googleId: userInfo?.id as string,
  });

  const account = await accountService.getAccountById(session.account._id);
  session.account = JSON.parse(JSON.stringify(account));
  await session.save();

  return {
    success: true,
    message: "Connected with google",
    connected: true,
  };
}

export async function googleDisconnectAction(): Promise<Response> {
  const session = await getSession();
  if (!session.account) {
    return {
      success: false,
      message: "OPERATION_PROHIBITED",
    };
  }

  await accountService.updateAccount(session?.account?._id, {
    googleId: undefined,
  });

  const account = await accountService.getAccountById(session.account._id);
  session.account = JSON.parse(JSON.stringify(account));
  await session.save();

  return {
    success: true,
    message: "Disconnected from google",
    connected: false,
  };
}

export async function changePasswordAction(
  _prev: any,
  payload: ChangePassPayload
) {
  const { oldPassword, newPassword } = payload;

  const session = await getSession();
  if (!session.account) {
    return {
      success: false,
      message: "OPERATION_PROHIBITED",
    };
  }

  try {
    await securityService.validateSignIn(session.account.email, oldPassword);
    await accountService.updateAccount(session?.account?._id, {
      password: securityService.hashPassword(newPassword),
    });

    return {
      success: true,
      message: "Thay đổi mật khẩu thành công",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
