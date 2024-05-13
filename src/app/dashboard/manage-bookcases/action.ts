"use server";

import { Bookcase, BookcaseDocument } from "@/lib/models/bookcase.model";
import { bookcaseService } from "@/lib/services/bookcase.service";
import { dbService } from "@/lib/services/db.service";

export interface GetBookcasesPayload {
  page?: number;
  limit?: number;
  filter?: any;
}

export async function createBookcaseAction(prev: any, payload: Bookcase) {
  await dbService.connect();
  try {
    await bookcaseService.create(payload);
    return {
      success: true,
      message: "Thêm kệ sách thành công",
    };
  } catch (error) {
    return {
      success: false,
      message: "Có lỗi khi thêm kệ sách",
    };
  }
}

export async function getBookcaseAction(_: any, payload: GetBookcasesPayload) {
  await dbService.connect();
  const { page = 1, limit = 20, filter } = payload;
  return await bookcaseService.get(page, limit, filter);
}

export async function deleteBookcaseAction(_: any, _id: string) {
  await dbService.connect();

  try {
    await bookcaseService.deleteById(_id);
    return {
      success: true,
      message: "Đã xóa tủ sách",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getBookcaseByIdAction(prev: any, _id: string) {
  await dbService.connect();
  try {
    return {
      data: await bookcaseService.getById(_id),
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

export async function updateBookcaseAction(
  prev: any,
  data: Partial<BookcaseDocument>
) {
  await dbService.connect();
  try {
    await bookcaseService.update(data._id, data);
    return { success: true, message: "Đã cập nhật ngăn sách" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
