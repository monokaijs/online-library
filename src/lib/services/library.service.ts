import { BookcaseModel } from "@/lib/models/bookcase.model";
import {
  LibraryDocument,
  LocationModel,
  Location,
} from "@/lib/models/library.model";

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
    const bookcase = await LocationModel.create(payload);
    return JSON.parse(JSON.stringify(bookcase));
  }

  async deleteById(_id: string): Promise<void> {
    try {
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
