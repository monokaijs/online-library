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
  publishYear: string;
  picture: string;
  language: string;
  borrowingDateLimit: number;
  status: BookStatus;
}

const BookSchema = new mongoose.Schema<Book>({}, { timestamps: true });

export interface BookDocument extends Document, Book {}

BookSchema.plugin(paginate);

let model;

try {
  model = mongoose.model("Book");
} catch (e) {
  model = mongoose.model("Book", BookSchema);
}

export const BookModel = model as Model<BookDocument>;
