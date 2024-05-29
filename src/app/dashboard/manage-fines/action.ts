"use server";

import { Borrow, BorrowDocument } from "@/lib/models/borrow.model";
import { borrowService } from "@/lib/services/borrow.service";
import { dbService } from "@/lib/services/db.service";
import { message } from "antd";

export interface GetBookPayload {
  page?: number;
  limit?: number;
  filter?: any;
}

export async function createBorrowAction(prev: any, payload: Borrow) {
  await dbService.connect();
  try {
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
  const { page = 1, limit = 20, filter } = payload;
  return await borrowService.get(page, limit, filter);
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

export async function returnBookAction(_prev: any, borrowId: string) {
  await dbService.connect();
  try {
    const data = await borrowService.returnBook(borrowId);
    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function payFineAction(_prev: any, borrowId: string) {
  try {
    const data = await borrowService.payFine(borrowId);
    return { success: true, data, message: "Thành công" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
