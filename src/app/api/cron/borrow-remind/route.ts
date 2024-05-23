import { AccountVerificationTemplate } from "@/lib/mailing/templates/account.verification.template";
import { BorrowReminderTemplate } from "@/lib/mailing/templates/borrow-reminder.template";
import { BorrowModel, BorrowStatus } from "@/lib/models/borrow.model";
import { LibraryStatus, LocationModel } from "@/lib/models/library.model";
import { dbService } from "@/lib/services/db.service";
import mailingService from "@/lib/services/mailing.service";
import moment from "moment";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextRequest) {
  // if (
  //   req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  // ) {
  //   return Response.json({ success: false, message: "Unauthorized" });
  // }
  const currentDate = new Date();
  const targetDate = new Date(currentDate);
  targetDate.setDate(currentDate.getDate() + 5);

  targetDate.setHours(0, 0, 0, 0);

  const nextDay = new Date(targetDate);
  nextDay.setDate(targetDate.getDate() + 1);

  await dbService.connect();
  const borrows = await BorrowModel.aggregate([
    {
      $match: {
        returnDate: {
          $gte: targetDate,
          $lt: nextDay,
        },
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

  const libraries = await LocationModel.find({ status: LibraryStatus.OPENING });
  const hotlines = libraries.map((item) => `Cơ sở ${item.name}: ${item.address} - Hotline: ${item.phoneNumber}`);

  borrows.forEach((borrow) => {
    try {
      mailingService
        .sendEmail(
          borrow._id[0].email,
          "D-Free Book | Thông báo sách quá hẹn",
          BorrowReminderTemplate(borrow._id[0], borrow.borrows, hotlines)
        )
        .then(() => {
          console.log(`Email was sent for ${borrow._id[0].email}`);
        });
    } catch (error) {}
  });

  return Response.json({ data: borrows });
}
