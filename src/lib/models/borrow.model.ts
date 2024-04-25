import mongoose, { Document, Model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { Book } from "@/lib/models/book.model";

export interface Borrow {
  user: Account;
  book: Book,
  borrowDate: string,
  returnDate: string,
  deliveryMethod: string,
  email: string,
  note: string,
  address: string
}

const BorrowSchema = new mongoose.Schema<Borrow>({}, { timestamps: true });

export interface BorrowDocument extends Document, Borrow {}

BorrowSchema.plugin(paginate);

let model;

try {
  model = mongoose.model("Borrow");
} catch (e) {
  model = mongoose.model("Borrow", BorrowSchema);
}

export const BorrowModel = model as Model<BorrowDocument>;
