import mongoose, { Document, Model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { Bookcase } from "@/lib/models/bookcase.model";
import { Borrow } from "@/lib/models/borrow.model";

export enum BookStatus {
  AVAILABLE = "available",
  OVERDUE = "overdue",
  BORROWING = "borrowing",
}

export interface Book {
  _id?: any;
  bookcase?: Bookcase;
  authorName: string;
  description: string;
  isbn: string;
  name: string;
  publisher: string;
  publishYear: string;
  picture: string;
  language: string;
  borrowingDateLimit: number;
  status: BookStatus;
  borrowRecord?: Borrow
}

const BookSchema = new mongoose.Schema<Book>({
  bookcase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bookcase'
  },
  borrowRecord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Borrow'
  },
  authorName: String,
  description: String,
  isbn: String,
  name: String,
  publisher: String,
  publishYear: String,
  picture: String,
  language: String,
  borrowingDateLimit: Number,
  status: {
    type: String,
    enum: Object.values(BookStatus),
  },
}, { timestamps: true });

export interface BookDocument extends Document, Book {}

BookSchema.plugin(paginate);

let model;

try {
  model = mongoose.model("Book");
} catch (e) {
  model = mongoose.model("Book", BookSchema);
}

export const BookModel = model as Model<BookDocument>;
