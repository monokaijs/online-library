"use server";

import accountService from "@/lib/services/account.service";
import { dbService } from "@/lib/services/db.service";

export interface GetAccountPayload {
  page?: number;
  limit?: number;
}

export async function deleteAccountAction(id: string) {
  await dbService.connect();
  return await accountService.deleteAccount(id);
}

export async function updateAccountAction(
  id: string,
  account: Partial<Account>
) {
  return await accountService.updateAccount(id, account);
}

export async function getAccountsAction(payload: GetAccountPayload) {
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
