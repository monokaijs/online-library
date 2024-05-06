import { BookcaseModel } from "@/lib/models/bookcase.model";
import { LocationModel } from "@/lib/models/library.model";

class LibraryService {
  async get() {
    const libaries = await LocationModel.find();
    const bookcases = await BookcaseModel.find().populate("library");
    return { libaries, bookcases };
  }
}

export const libraryService = new LibraryService();
