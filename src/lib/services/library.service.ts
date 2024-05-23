import { BookcaseModel } from "@/lib/models/bookcase.model";
import {
  LibraryDocument,
  Location,
  LocationModel,
} from "@/lib/models/library.model";
import { BookModel } from "../models/book.model";

class LibraryService {
  async get() {
    const libaries = await LocationModel.find();
    return JSON.parse(JSON.stringify(libaries));
  }

  async getAll() {
    const libaries = await LocationModel.find();
    const bookcases = await BookcaseModel.find().populate("library");

    return JSON.parse(JSON.stringify({ libaries, bookcases }));
  }

  async create(payload: Location) {
    await LocationModel.collection.createIndex(
      { name: 1 },
      { collation: { locale: "en", strength: 2 } }
    );

    const nameCheck = await LocationModel.findOne(
      { name: payload.name },
      { collation: { locale: "en", strength: 2 } }
    );

    if (nameCheck) {
      throw new Error("Tên thư viện đã tồn tại!");
    }

    const bookcase = await LocationModel.create(payload);
    return JSON.parse(JSON.stringify(bookcase));
  }

  async deleteById(_id: string): Promise<void> {
    try {
      const bookcount = await BookModel.countDocuments({ library: _id });
      const bookcasecount = await BookcaseModel.countDocuments({ library: _id });
      if (bookcount > 0 || bookcasecount > 0) {
        throw Error("Vui lòng chuyển hết sách khỏi thư viện.");
      }
      await LocationModel.findByIdAndDelete(_id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getById(_id: string): Promise<Location | null> {
    try {
      const data = await LocationModel.findById(_id);
      return JSON.parse(JSON.stringify(data));
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(
    _id: string,
    updateData: Partial<LibraryDocument>
  ): Promise<LibraryDocument | null> {
    try {
      await LocationModel.collection.createIndex(
        { name: 1 },
        { collation: { locale: "en", strength: 2 } }
      );

      const nameCheck = await LocationModel.findOne(
        { name: updateData.name },
        { collation: { locale: "en", strength: 2 } }
      );

      if (nameCheck?._id.toString() !== _id) {
        throw new Error("Tên thư viện đã tồn tại!");
      }

      const data = await LocationModel.findByIdAndUpdate(_id, updateData, {
        new: true,
      });
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const libraryService = new LibraryService();
