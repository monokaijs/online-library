"use server";

import accountService from "@/lib/services/account.service";
import { dbService } from "@/lib/services/db.service";
import { getSession } from "@/lib/utils/getSession";
import { message } from "antd";

export interface GetAccountPayload {
  page?: number;
  limit?: number;
  filter?: any;
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
      message: "Đã xóa tài khoản",
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
    return { success: true, message: "Đã cập nhật tài khoản" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function getAccountsAction(_: any, payload: GetAccountPayload) {
  await dbService.connect();
  const { page = 1, limit = 20, filter } = payload;
  return await accountService.getAccounts(page, limit, filter);
}

export async function createAccountAction(_: any, account: Account) {
  await dbService.connect();
  try {
    await accountService.postAccount(account);
    return {
      success: true,
      message: "Tài khoản đã được tạo, vui lòng kiểm tra email",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getAccountByIdAction(prev: any, _id: string) {
  await dbService.connect();
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

export async function getAccountBySessionAction(prev: any, any: any) {
  await dbService.connect();
  try {
    const session = await getSession();
    return {
      account: await accountService.getAccountById(session.account?._id),
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

export async function getAccountDetailAction(_prev: any, _id: string) {
  await dbService.connect();
  try {
    return {
      data: await accountService.getAccountDetail(_id),
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: undefined,
    };
  }
}
