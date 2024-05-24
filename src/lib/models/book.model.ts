import mongoose, { Document, Model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { Bookcase } from "@/lib/models/bookcase.model";
import { Borrow } from "@/lib/models/borrow.model";
import { Location } from "@/lib/models/library.model";

export enum BookStatus {
  AVAILABLE = "available",
  OVERDUE = "overdue",
  BORROWING = "borrowing",
  PENDING = "pending",
}

export interface Book {
  _id?: any;
  bookcase?: Bookcase;
  library: Location,
  authorName: string;
  description: string;
  noPages: number;
  giver?: Account;
  bookID: string;
  category: string;
  name: string;
  publisher: string;
  publishYear: string;
  picture: string;
  language: string;
  borrowingDateLimit: number;
  status: BookStatus;
  borrowRecord?: Borrow;
  isDelete?: boolean;
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
  library: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  },
  bookID: String,
  category: String,
  authorName: String,
  description: String,
  noPages: Number,
  giver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
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
  isDelete: Boolean
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
