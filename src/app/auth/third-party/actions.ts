"use server";
import { appEnv } from "@/lib/configs/env";
import { AccountModel } from "@/lib/models/account.model";
import accountService from "@/lib/services/account.service";
import { dbService } from "@/lib/services/db.service";
import { getSession } from "@/lib/utils/getSession";
import { google, oauth2_v2 } from "googleapis";

export interface ConnectState {
  success: boolean;
  message?: string;
}

export interface ConnectPayload {
  type: string;
  code: string;
}

export async function googleConnectAction(
  _: any,
  payload: ConnectPayload
): Promise<ConnectState> {
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
  if (!session.account) {
    const connectedAccount = await accountService.getAccountByGoogleId(
      userInfo.id
    );

    if (connectedAccount) {
      session.account = connectedAccount;

      return {
        success: true,
        message: "LOGIN_SUCCESS",
      };
    } else {
      return {
        success: false,
        message: "OPERATION_PROHIBITED",
      };
    }
  }

  await AccountModel.findOneAndUpdate(
    {
      _id: session?.acccount?._id,
    },
    {
      $set: {
        googleId: userInfo?.id,
      },
    }
  );

  return {
    success: true,
    message: "CONNECTED_WITH_GOOGLE",
  };
}

export async function googleDisconnectAction(): Promise<ConnectState> {
  const session = await getSession();
  if (!session.account) {
    return {
      success: false,
      message: "OPERATION_PROHIBITED",
    };
  }

  await AccountModel.findOneAndUpdate(
    {
      _id: session?.acccount?._id,
    },
    {
      $set: {
        googleId: null,
      },
    }
  );

  return {
    success: true,
    message: "DISCONNECTED_GOOGLE",
  };
}
