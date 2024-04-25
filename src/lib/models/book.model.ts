import mongoose, { Document, Model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { Bookcase } from "@/lib/models/bookcase.model";

export enum BookStatus {
  AVAILABLE = "available",
  OVERDUE = "overdue",
  BORROWING = "borrowing",
}

export interface Book {
  bookcase: Bookcase;
  authorName: string;
  description: string;
  isbn: string;
  name: string;
  publishYear: string;
  picture: string;
  language: string;
  borrowingDateLimit: number;
  status: BookStatus;
}

const BookSchema = new mongoose.Schema<Book>({
  bookcase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bookcase'
  },
  authorName: String,
  description: String,
  isbn: String,
  name: String,
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
