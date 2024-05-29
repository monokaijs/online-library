"use server";

import { AccountModel } from "@/lib/models/account.model";
import { BookModel } from "@/lib/models/book.model";
import { Borrow, BorrowModel, BorrowStatus } from "@/lib/models/borrow.model";
import { dbService } from "@/lib/services/db.service";
import { fineCaculate } from "@/lib/utils/fineCaculate";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

interface Props {
  type?: string | null;
  picker?: string | null;
}

export async function getDashboard(prev: any, payload: Props) {
  await dbService.connect();
  try {
    let { type, picker } = payload;
    type = !!type ? type : "month";
    picker = !!picker ? picker : dayjs().format("MMYYYY");

    let groupStage = {};
    let sortStage = {};
    let format = "";
    let matchStage = {};

    dayjs.extend(customParseFormat);
    const currentDate = dayjs();
    let selectedDate = dayjs();

    switch (type) {
      case "date":
        format = "DDMMYYYY";
        selectedDate = dayjs(picker, format);
        matchStage = {
          $match: {
            createdAt: {
              $gte: currentDate.startOf("month").toDate(),
              $lte: currentDate.endOf("month").toDate(),
            },
          },
        };
        groupStage = {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
              day: { $dayOfMonth: "$createdAt" },
            },
            count: { $sum: 1 },
            items: { $push: "$$ROOT" },
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
        selectedDate = dayjs(picker, format);
        matchStage = {
          $match: {
            createdAt: {
              $gte: currentDate.subtract(3, "years").startOf("year").toDate(),
              $lte: currentDate.endOf("year").toDate(),
            },
          },
        };
        groupStage = {
          $group: {
            _id: { year: { $year: "$createdAt" } },
            count: { $sum: 1 },
            items: { $push: "$$ROOT" },
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
        selectedDate = dayjs(picker, format);
        matchStage = {
          $match: {
            createdAt: {
              $gte: currentDate.startOf("year").toDate(),
              $lte: currentDate.endOf("year").toDate(),
            },
          },
        };
        groupStage = {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
            items: { $push: "$$ROOT" },
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

    const aggregationPipeline: any = [matchStage, groupStage, sortStage];

    const accounts = await AccountModel.aggregate(aggregationPipeline);
    const books = await BookModel.aggregate(aggregationPipeline);
    const borrows = await BorrowModel.aggregate(aggregationPipeline);

    const today = new Date();
    today.setHours(0, 1, 1, 1);
    const overdue = await BorrowModel.aggregate([
      {
        $match: {
          returnDate: { $lte: today },
          status: BorrowStatus.BORROWING,
        },
      },
      ...aggregationPipeline,
    ]);

    const topDonate = await BookModel.aggregate([
      {
        $match: {
          isDelete: { $ne: true },
        },
      },
      {
        $group: {
          _id: "$giver",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $lookup: {
          from: "accounts",
          localField: "_id",
          foreignField: "_id",
          as: "giverDetails",
        },
      },
      {
        $unwind: "$giverDetails",
      },
      {
        $project: {
          _id: 0,
          giver: "$giverDetails",
          count: 1,
        },
      },
    ]);

    const topBorrow = await BorrowModel.aggregate([
      {
        $match: {
          isDelete: false,
        },
      },
      {
        $group: {
          _id: "$user",
          borrowCount: { $sum: 1 },
        },
      },
      {
        $sort: { borrowCount: -1 },
      },
      {
        $lookup: {
          from: "accounts",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          user: 1,
          borrowCount: 1,
        },
      },
    ]);

    const fillMissingDates = (
      data: any[],
      type: string | null,
      selectedDate: dayjs.Dayjs
    ) => {
      let filledData = [];
      if (type === "date") {
        const daysInMonth = currentDate.daysInMonth();
        for (let day = 1; day <= daysInMonth; day++) {
          const entry = data.find((d) => d._id.day === day);
          const isSelected =
            selectedDate.isValid() && selectedDate.date() === day;
          const label = `${day.toString().padStart(2, "0")}`;
          // /${(
          //   currentDate.month() + 1
          // )
          //   .toString()
          //   .padStart(2, "0")}
          if (entry) {
            filledData.push({ ...entry, selected: isSelected, label });
          } else {
            filledData.push({
              ...entry,
              _id: {
                year: currentDate.year(),
                month: currentDate.month() + 1,
                day,
              },
              count: 0,
              selected: isSelected,
              label,
            });
          }
        }
      } else if (type === "month") {
        for (let month = 1; month <= 12; month++) {
          const entry = data.find((d) => d._id.month === month);
          const isSelected =
            selectedDate.isValid() && selectedDate.month() + 1 === month;
          const label = `T${month}`;
          // /${currentDate.year()}
          if (entry) {
            filledData.push({ ...entry, selected: isSelected, label });
          } else {
            filledData.push({
              ...entry,
              _id: { year: currentDate.year(), month },
              count: 0,
              selected: isSelected,
              label,
            });
          }
        }
      } else if (type === "year") {
        const startYear = currentDate.subtract(3, "years").year();
        for (let year = startYear; year <= currentDate.year(); year++) {
          const entry = data.find((d) => d._id.year === year);
          const isSelected =
            selectedDate.isValid() && selectedDate.year() === year;
          const label = `${year}`;
          if (entry) {
            filledData.push({ ...entry, selected: isSelected, label });
          } else {
            filledData.push({
              ...entry,
              _id: { year },
              count: 0,
              selected: isSelected,
              label,
            });
          }
        }
      }
      return filledData.sort((a, b) => {
        if (type === "date") {
          return a._id.day - b._id.day;
        } else if (type === "month") {
          return a._id.month - b._id.month;
        } else if (type === "year") {
          return a._id.year - b._id.year;
        }
        return 0;
      });
    };

    const fines = fillMissingDates(overdue, type, selectedDate);

    const finesCaculate = fines.map((fine) => {
      if (fine.items) {
        const total = fine.items?.reduce(
          (sum: any, borrow: Partial<Borrow>) => {
            return sum + borrow.hashFineAmount != undefined
              ? borrow.hashFineAmount
              : fineCaculate(borrow).amount;
          },
          0
        );

        fine.count = total;
      }

      return fine;
    });

    const data = {
      success: true,
      data: {
        accounts: fillMissingDates(accounts, type, selectedDate),
        books: fillMissingDates(books, type, selectedDate),
        borrows: fillMissingDates(borrows, type, selectedDate),
        overdue: fillMissingDates(overdue, type, selectedDate),
        fines: finesCaculate,
        topDonate: topDonate,
        topBorrow: topBorrow,
      },
    };

    return JSON.parse(JSON.stringify(data));
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
