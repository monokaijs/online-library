"use server";

import { LibraryDocument, Location } from "@/lib/models/library.model";
import { dbService } from "@/lib/services/db.service";
import { libraryService } from "@/lib/services/library.service";

export async function createLocationAction(prev: any, payload: Location) {
  await dbService.connect();
  try {
    await libraryService.create(payload);
    return {
      success: true,
      message: "Thêm thư viện thành công",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getLibraryAction(_: any) {
  await dbService.connect();
  try {
    const data = await libraryService.get();
    return { data, success: true };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function deleteLibraryAction(_: any, _id: string) {
  await dbService.connect();

  try {
    await libraryService.deleteById(_id);
    return {
      success: true,
      message: "Đã xóa thư viện",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getLibraryByIdAction(prev: any, _id: string) {
  await dbService.connect();

  try {
    return {
      data: await libraryService.getById(_id),
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

export async function updateLocationAction(
  prev: any,
  data: Partial<LibraryDocument>
) {
  await dbService.connect();
  
  try {
    await libraryService.update(data._id, data);
    return { success: true, message: "Đã cập nhật thư viện" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
