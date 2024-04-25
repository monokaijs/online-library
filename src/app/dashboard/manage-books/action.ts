"use server";

import { Bookcase, BookcaseDocument } from "@/lib/models/bookcase.model";
import { bookService } from "@/lib/services/book.service";
import { bookcaseService } from "@/lib/services/bookcase.service";
import { dbService } from "@/lib/services/db.service";

export interface GetBookPayload {
  page?: number;
  limit?: number;
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
      success: true,
      message: "Có lỗi khi thêm kệ sách",
    };
  }
}

export async function getBookcaseAction(_: any, payload: GetBookPayload) {
  await dbService.connect();
  const { page = 1, limit = 20 } = payload;
  return await bookService.get(page, limit);
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
  try {
    await bookcaseService.update(data._id, data);
    return { success: true, message: "Đã cập nhật ngăn sách" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
