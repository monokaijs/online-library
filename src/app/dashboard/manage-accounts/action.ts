"use server";

import accountService from "@/lib/services/account.service";
import { dbService } from "@/lib/services/db.service";
import { getSession } from "@/lib/utils/getSession";
import { message } from "antd";

export interface GetAccountPayload {
  page?: number;
  limit?: number;
}

export async function deleteAccountAction(_: any, _id: string) {
  await dbService.connect();
  const session = await getSession();
  if (session.account?._id == _id) {
    return {
      succces: false,
      message: "Error",
    };
  }

  try {
    await accountService.deleteAccount(_id);
    return {
      success: true,
      message: "Deleted account",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function updateAccountAction(
  prev: any,
  account: Partial<Account>
) {
  try {
    await accountService.updateAccount(account._id, account);
    return { success: true, message: "Account updated" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function getAccountsAction(_: any, payload: GetAccountPayload) {
  await dbService.connect();
  const { page = 1, limit = 20 } = payload;
  return await accountService.getAccounts(page, limit);
}

export async function createAccountAction(_: any, account: Account) {
  await dbService.connect();
  try {
    await accountService.postAccount(account);
    return {
      success: true,
      message: "ACCOUNT_CREATED",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getAccountByIdAction(prev: any, _id: string) {
  try {
    return {
      account: await accountService.getAccountById(_id),
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      account: undefined,
    };
  }
}
