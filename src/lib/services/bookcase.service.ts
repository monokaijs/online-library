import {
  Bookcase,
  BookcaseDocument,
  BookcaseModel,
} from "@/lib/models/bookcase.model";
import { FilterQuery } from "mongoose";

class BookcaseService {
  async create(payload: Bookcase) {
    const bookcase = await BookcaseModel.create(payload);
    return JSON.parse(JSON.stringify(bookcase));
  }

  async get(
    page: number,
    limit: number,
    query?: FilterQuery<BookcaseDocument>
  ) {
    try {
      const options = {
        page,
        limit,
        populate: "library"
      };

      const filter: any = {}
      if(query?.query){
        filter.$or = [
          { category: { $regex: new RegExp(query.query, "i") } },
          { position: { $regex: new RegExp(query.query, "i") } },
        ];
      }

      if(query?.library){
        filter.library = query.library
      }

      const result = await (BookcaseModel as any).paginate(filter, options);
      return {
        data: JSON.parse(JSON.stringify(result.docs)),
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
      await BookcaseModel.findByIdAndDelete(_id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getById(_id: string): Promise<Bookcase | null> {
    try {
      const data = await BookcaseModel.findById(_id);
      return JSON.parse(JSON.stringify(data));
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(
    _id: string,
    updateData: Partial<BookcaseDocument>
  ): Promise<BookcaseDocument | null> {
    try {
      const data = await BookcaseModel.findByIdAndUpdate(_id, updateData, {
        new: true,
      });
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const bookcaseService = new BookcaseService();
