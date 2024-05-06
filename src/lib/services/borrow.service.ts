import { BookStatus } from "@/lib/models/book.model";
import {
  Borrow,
  BorrowDocument,
  BorrowModel,
  BorrowStatus,
} from "@/lib/models/borrow.model";
import { FilterQuery } from "mongoose";
import { BookcaseModel } from '@/lib/models/bookcase.model';
import accountService from "./account.service";
import { bookService } from "./book.service";
import dayjs from "dayjs";

class BorrowService {
  async create(payload: any) {
    const book = await bookService.getById(payload.book);
    if (!book || book.status !== BookStatus.AVAILABLE) {
      throw Error("Sách hiện không khả dụng");
    }

    payload.status = BorrowStatus.BORROWING;
    const borrowRecord = await BorrowModel.create(payload);
    await bookService.update(book._id, {
      status: BookStatus.BORROWING,
      borrowRecord: borrowRecord,
    });
    return JSON.parse(JSON.stringify(borrowRecord));
  }

  async get(page: number, limit: number, query?: Partial<Borrow>) {
    BookcaseModel.find();
    
    try {
      const options = {
        page,
        limit,
        populate: [
          "user",
          {
            path: "book",
            populate: {
              path: "bookcase",
              populate: "library",
            },
          },
        ],
      };

      const filter: FilterQuery<BorrowDocument> = {};
      //   if (query?.name) {
      //     filter.name = { $regex: new RegExp(query.name, "i") };
      //   }

      const result = await (BorrowModel as any).paginate(filter, options);

      return {
        data: JSON.parse(JSON.stringify(result.docs)) as Borrow[],
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
      await BorrowModel.findByIdAndDelete(_id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getById(_id: string): Promise<Borrow | null> {
    try {
      const data = await BorrowModel.findById(_id).populate([
        "user",
        {
          path: "book",
          populate: {
            path: "bookcase",
            populate: "library",
          },
        },
      ]);
      return JSON.parse(JSON.stringify(data));
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getDetail(_id: string) {
    try {
      const borrowRecord = await this.getById(_id);
      const user = await accountService.getAccountById(borrowRecord?.user._id);
      const history = await BorrowModel.find({ user: user?._id });
      const borrowing = history.filter((item) => {
        return item.status === BorrowStatus.BORROWING;
      }).length;

      const returned = history.length - borrowing;
      const overdued = history.filter(
        (item) => item.status === BorrowStatus.OVERDUE
      ).length;

      return JSON.parse(
        JSON.stringify({
          borrowRecord,
          analysis: { total: history.length, borrowing, returned, overdued },
        })
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(
    _id: string,
    updateData: Partial<Borrow>
  ): Promise<Borrow | null> {
    try {
      const data = await BorrowModel.findByIdAndUpdate(_id, updateData, {
        new: true,
      });
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async returnBook(borrowId: string) {
    try {
      const borrow: any = await this.getById(borrowId);
      const overdued = dayjs().diff(borrow?.returnDate) > 0;
      const result = this.update(borrowId, {
        status: overdued ? BorrowStatus.OVERDUE : BorrowStatus.RETURNED,
        realReturnDate: new Date().toString(),
      });

      const book = await bookService.getById(borrow?.book);
      await bookService.update(book?._id, {
        status: BookStatus.AVAILABLE,
      });

      return JSON.parse(JSON.stringify(result));
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const borrowService = new BorrowService();
