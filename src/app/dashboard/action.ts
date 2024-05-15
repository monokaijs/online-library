"use server";

import { AccountModel } from "@/lib/models/account.model";
import { BookModel } from "@/lib/models/book.model";
import { BorrowModel, BorrowStatus } from "@/lib/models/borrow.model";
import { dbService } from "@/lib/services/db.service";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";

interface Props {
  type?: string | null;
  picker?: string | null;
}

export async function getDashboard(prev: any, payload: Props) {
  await dbService.connect();
  try {
    const { type = "day", picker } = payload;

    let groupStage = {};
    let sortStage = {};
    let format = "";

    switch (type) {
      case "date":
        format = "DDMMYYYY";
        groupStage = {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
              day: { $dayOfMonth: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        };
        sortStage = {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
            "_id.day": 1,
          },
        };
        break;

      case "year":
        format = "YYYY";
        groupStage = {
          $group: {
            _id: { year: { $year: "$createdAt" } },
            count: { $sum: 1 },
          },
        };
        sortStage = {
          $sort: {
            "_id.year": 1,
          },
        };
        break;

      default:
        format = "MMYYYY";
        groupStage = {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        };

        sortStage = {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        };
        break;
    }

    dayjs.extend(customParseFormat);
    const date = dayjs(picker, format);

    const aggregationPipeline: any = [
      groupStage,
      sortStage,
      {
        $addFields: {
          picker: {
            year: date.isValid() ? date.year() : dayjs().year(),
            month: date.isValid() ? date.month() + 1 : dayjs().month() + 1,
            day: date.isValid() ? date.date() : dayjs().date(),
          },
        },
      },
    ];
    const accounts = await AccountModel.aggregate(aggregationPipeline);
    const books = await BookModel.aggregate(aggregationPipeline);
    const borrows = await BorrowModel.aggregate(aggregationPipeline);
    const overdue = await BorrowModel.aggregate([
      {
        $match: {
          returnDate: { $lt: new Date() },
          isDelete: false,
          status: BorrowStatus.BORROWING,
        },
      },
      ...aggregationPipeline,
    ]);

    return {
      success: true,
      data: {
        accounts,
        books,
        borrows,
        overdue,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
