import { Book } from "@/lib/models/book.model";
import mongoose, { Document, Model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { Location } from "@/lib/models/library.model";

export enum BorrowStatus {
  OVERDUE = "overdue",
  BORROWING = "borrowing",
  RETURNED = "returned",
  PENDING = "pending",
  CANCEL = "cancel",
}

export enum PaymentStatus {
  PAID = "paid",
  UNPAID = "unpaid"
}

export interface Borrow {
  _id?: any;
  user?: Account;
  book?: Book;
  library?: Location;
  phoneNumber: string;
  borrowDate: Date;
  returnDate: Date;
  realReturnDate: Date;
  deliveryMethod: string;
  email: string;
  note: string;
  address: string;
  status: BorrowStatus;
  isDelete?: boolean;
  paymentStatus: PaymentStatus;
  hashFineAmount: number;
  description: string;
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
    library: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
    phoneNumber: String,
    borrowDate: Date,
    returnDate: Date,
    realReturnDate: Date,
    deliveryMethod: String,
    email: String,
    note: String,
    address: String,
    status: {
      type: String,
      enum: Object.values(BorrowStatus),
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
    },
    hashFineAmount: Number,
    description: String,
    isDelete: {
      type: Boolean,
      default: false,
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
