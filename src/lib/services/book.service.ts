import {
  Book,
  BookDocument,
  BookModel,
  BookStatus,
} from "@/lib/models/book.model";
import { FilterQuery } from "mongoose";
import { BorrowModel } from "../models/borrow.model";
import { LocationModel } from "../models/library.model";
import { borrowService } from "./borrow.service";

class BookService {
  async create(payload: Book) {
    payload.status = BookStatus.AVAILABLE;
    const res = await BookModel.create(payload);
    return JSON.parse(JSON.stringify(res));
  }

  async get(page: number, limit: number, query?: any) {
    await LocationModel.find();

    try {
      const options: any = {
        page,
        limit,
        populate: [
          {
            path: "bookcase",
            populate: "library",
          },
          "borrowRecord",
          "library",
        ],
        sort: { createdAt: -1 },
      };

      const filter: FilterQuery<BookDocument> = {};
      if (query?.query) {
        filter.$or = [
          { name: { $regex: new RegExp(query.query, "i") } },
          { authorName: { $regex: new RegExp(query.query, "i") } },
          { isbn: { $regex: new RegExp(query.query, "i") } },
        ];
      }
      if (query?.status) {
        filter.status = query.status;
      }

      if (query?.type === "available") {
        filter.status = BookStatus.AVAILABLE;
      }

      if (query?.type === "borrowing") {
        filter.status = BookStatus.BORROWING;
      }

      if (query?.library) {
        filter.library = query.library;
      }

      if (query?.type === "new") {
        options.sort = { createdAt: -1 };
      }

      if (query?.type === "trending") {
        const result = await BorrowModel.aggregate([
          {
            $group: {
              _id: "$book",
              totalBorrowCount: { $sum: 1 },
            },
          },
          { $sort: { totalBorrowCount: -1 } },
          {
            $lookup: {
              from: "books",
              localField: "_id",
              foreignField: "_id",
              as: "bookInfo",
            },
          },
        ]);

        const data = result
          .filter((item) => item.bookInfo.length > 0)
          .map((item) => ({
            ...item.bookInfo[0],
            totalBorrowCount: item.totalBorrowCount,
          }))
          .slice(0, 20);

        const groupByName: any = {};

        data.forEach((item) => {
          const itemName = item?.name?.toUpperCase();
          if (groupByName[itemName] === undefined) {
            groupByName[itemName] = {
              ...item,
              totalBorrowCount: item?.totalBorrowCount,
            };
          } else {
            groupByName[itemName].totalBorrowCount =
              groupByName[itemName]?.totalBorrowCount + item?.totalBorrowCount;
          }
        });

        return JSON.parse(
          JSON.stringify({
            data: Object.values(groupByName).sort(
              (a: any, b: any) => b.totalBorrowCount - a.totalBorrowCount
            ) as Book[],
            totalPages: 1,
            totalDocs: result.length,
            page,
            limit: result.length,
          })
        );
      }

      const result = await (BookModel as any).paginate(filter, options);

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

  async getBookDetail(_id: string) {
    try {
      const data = await BookModel.findById(_id).populate([
        {
          path: "bookcase",
          populate: "library",
        },
        "borrowRecord",
        "giver",
      ]);

      const history = await borrowService.getAllByBookId(_id);

      return JSON.parse(JSON.stringify({ book: data, history }));
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(
    _id: string,
    updateData: Partial<BookDocument>
  ): Promise<BookDocument | null> {
    BorrowModel.find();
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
