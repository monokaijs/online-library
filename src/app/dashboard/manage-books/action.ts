"use server";

import { Book, BookDocument } from "@/lib/models/book.model";
import { Bookcase, BookcaseDocument } from "@/lib/models/bookcase.model";
import { bookService } from "@/lib/services/book.service";
import { bookcaseService } from "@/lib/services/bookcase.service";
import { dbService } from "@/lib/services/db.service";
import { libraryService } from "@/lib/services/library.service";
import * as cheerio from "cheerio";

export interface GetBookPayload {
  page?: number;
  limit?: number;
  filter?: any
}

export async function createBookAction(prev: any, payload: Book) {
  await dbService.connect();
  try {
    await bookService.create(payload);
    return {
      success: true,
      message: "Thêm sách thành công",
    };
  } catch (error) {
    return {
      success: false,
      message: "Có lỗi khi thêm sách",
    };
  }
}

export async function getLibraryAction() {
  await dbService.connect();
  try {
    const data = await libraryService.getAll();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(data)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getImagesAction(_prev: any, q: string) {
  try {
    const text = await fetch(
      `https://cachep.vn/search?type=product&q=${q}`
    ).then((res) => res.text());

    const $ = cheerio.load(text);
    const imgTags = $("img");
    const imgSources = imgTags
      .map((index, element) => $(element).attr("src"))
      .get();
    return {
      success: true,
      data: imgSources.filter((item) => item.startsWith("//product")),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getBookAction(_: any, payload: GetBookPayload) {
  await dbService.connect();
  const { page = 1, limit = 20, filter } = payload;
  return await bookService.get(page, limit, filter);
}

export async function deleteBookAction(_: any, _id: string) {
  await dbService.connect();

  try {
    await bookService.deleteById(_id);
    return {
      success: true,
      message: "Đã xóa sách",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getBookByIdAction(prev: any, _id: string) {
  await dbService.connect();
  try {
    return {
      data: await bookService.getById(_id),
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

export async function getBookDetailAction(prev: any, _id: string) {
  await dbService.connect();
  try {
    return {
      data: await bookService.getBookDetail(_id),
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

export async function updateBookAction(
  prev: any,
  data: Partial<BookDocument>
) {
  await dbService.connect();
  try {
    await bookService.update(data._id, data);
    return { success: true, message: "Đã cập nhật sách" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
