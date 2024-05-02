import {
  Book,
  BookDocument,
  BookModel,
  BookStatus,
} from "@/lib/models/book.model";
import { FilterQuery } from "mongoose";
import { LibraryModel } from "../models/library.model";

class BookService {
  async create(payload: Book) {
    payload.status = BookStatus.AVAILABLE;
    const res = await BookModel.create(payload);
    return JSON.parse(JSON.stringify(res));
  }

  async get(page: number, limit: number, query?: FilterQuery<BookDocument>) {
    await LibraryModel.find();

    try {
      const options = {
        page,
        limit,
        populate: [
          {
            path: "bookcase",
            populate: "library",
          },
          "borrowRecord",
        ],
      };

      const result = await (BookModel as any).paginate(query, options);

      return {
        data: JSON.parse(JSON.stringify(result.docs)) as Book[],
        totalPages: result.totalPages,
        totalDocs: result.totalDocs,
        page,
        limit,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteById(_id: string): Promise<void> {
    try {
      await BookModel.findByIdAndDelete(_id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getById(_id: string): Promise<Book | null> {
    try {
      const data = await BookModel.findById(_id).populate([
        {
          path: "bookcase",
          populate: "library",
        },
        "borrowRecord",
      ]);
      return JSON.parse(JSON.stringify(data));
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(
    _id: string,
    updateData: Partial<BookDocument>
  ): Promise<BookDocument | null> {
    try {
      const data = await BookModel.findByIdAndUpdate(_id, updateData, {
        new: true,
      });
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const bookService = new BookService();
