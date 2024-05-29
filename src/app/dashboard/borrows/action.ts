"use server";

import {
  Borrow,
  BorrowDocument,
  BorrowStatus,
} from "@/lib/models/borrow.model";
import accountService from "@/lib/services/account.service";
import { borrowService } from "@/lib/services/borrow.service";
import { dbService } from "@/lib/services/db.service";
import { getSession } from "@/lib/utils/getSession";

export interface GetBookPayload {
  page?: number;
  limit?: number;
  filter?: any;
}

export async function createBorrowAction(prev: any, payload: Borrow) {
  await dbService.connect();
  try {
    payload.status = BorrowStatus.PENDING;
    await borrowService.create(payload);
    return {
      success: true,
      message: "Thêm phiếu mượn thành công",
    };
  } catch (error: any) {
    return {
      success: false,
      message: `Có lỗi khi thêm phiếu mượn: ${error.message}`,
    };
  }
}

export async function getBorrowAction(_: any, payload: GetBookPayload) {
  await dbService.connect();
  const session = await getSession();
  const { page = 1, limit = 20, filter } = payload;
  return await borrowService.get(page, limit, {
    ...filter,
    user: session.account?._id,
  });
}

export async function getProfileAction(_prev: any) {
  await dbService.connect();
  const session = await getSession();
  try {
    return {
      data: await accountService.getAccountDetail(session.account?._id),
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

export async function deleteBorrowAction(_: any, _id: string) {
  await dbService.connect();

  try {
    await borrowService.deleteById(_id);
    return {
      success: true,
      message: "Đã xóa phiếu mượn",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getBorrowByIdAction(prev: any, _id: string) {
  await dbService.connect();
  try {
    return {
      data: await borrowService.getById(_id),
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

export async function updateBorrowAction(
  prev: any,
  data: Partial<BorrowDocument>
) {
  await dbService.connect();
  try {
    await borrowService.update(data._id, data);
    return { success: true, message: "Đã cập nhật phiếu mượn" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function getBorrowDetailAction(prev: any, _id: string) {
  await dbService.connect();
  try {
    const data = await borrowService.getDetail(_id);
    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
