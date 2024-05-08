import { AccountVerificationTemplate } from "@/lib/mailing/templates/account.verification.template";
import { BorrowReminderTemplate } from "@/lib/mailing/templates/borrow-reminder.template";
import { BorrowModel, BorrowStatus } from "@/lib/models/borrow.model";
import { dbService } from "@/lib/services/db.service";
import mailingService from "@/lib/services/mailing.service";
import moment from "moment";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextRequest) {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return Response.json({ success: false, message: "Unauthorized" });
  }
  await dbService.connect();
  const borrows = await BorrowModel.aggregate([
    {
      $addFields: {
        dueDate: { $add: ["$returnDate", -2 * 24 * 60 * 60 * 1000] }, // Tính toán ngày hạn trả bằng cách thêm 2 ngày vào returnDate
      },
    },
    {
      $match: {
        dueDate: { $lt: new Date() },
        status: BorrowStatus.BORROWING,
      },
    },
    {
      $lookup: {
        from: "accounts",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "book",
        foreignField: "_id",
        as: "book",
      },
    },
    {
      $lookup: {
        from: "locations",
        localField: "library",
        foreignField: "_id",
        as: "library",
      },
    },
    {
      $group: {
        _id: "$user",
        borrows: { $push: "$$ROOT" },
      },
    },
  ]);

  borrows.forEach((borrow) => {
    try {
      mailingService.sendEmail(
        borrow._id[0].email,
        "D-Free Book | Thông báo sách quá hẹn",
        BorrowReminderTemplate(borrow._id[0], borrow.borrows)
      );
    } catch (error) {}
  });

  return Response.json({ data: borrows });
}
