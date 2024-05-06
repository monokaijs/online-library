import { Book } from "@/lib/models/book.model";
import mongoose, { Document, Model } from "mongoose";
import paginate from "mongoose-paginate-v2";

export enum BorrowStatus {
  OVERDUE = "overdue",
  BORROWING = "borrowing",
  RETURNED = "returned" 
}

export interface Borrow {
  _id?: any;
  user?: Account;
  book?: Book;
  phoneNumber: string;
  borrowDate: string;
  returnDate: string;
  realReturnDate: string;
  deliveryMethod: string;
  email: string;
  note: string;
  address: string;
  status: BorrowStatus;
}

const BorrowSchema = new mongoose.Schema<Borrow>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
    phoneNumber: String,
    borrowDate: String,
    returnDate: String,
    realReturnDate: String,
    deliveryMethod: String,
    email: String,
    note: String,
    address: String,
    status: {
      type: String,
      enum: Object.values(BorrowStatus),
    },
  },
  { timestamps: true }
);

export interface BorrowDocument extends Document, Borrow {}

BorrowSchema.plugin(paginate);

let model;

try {
  model = mongoose.model("Borrow");
} catch (e) {
  model = mongoose.model("Borrow", BorrowSchema);
}

export const BorrowModel = model as Model<BorrowDocument>;
