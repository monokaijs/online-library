import mongoose, {Document, Model} from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import {Category} from "@/lib/models/category.model";
import {BookAuthor} from "@/lib/models/author.model";
import {BookShelfSlot} from "@/lib/models/book-shelf-slot.model";
import {Publisher} from "@/lib/models/publisher.model";

export enum BookStatus {
  MISSING = 'missing',
  LOST = 'lost',
  AVAILABLE = 'available',
}

export enum BookCondition {
  NEW = 'new',
  OLD = 'old',
}

export interface Book {
  name: string;
  category: string | Category;
  author: string | BookAuthor;
  slot: string | BookShelfSlot;
  publisher: string | Publisher;
  title: string;
  publishDate: Date;
  language: string;
  description: string;
  status: BookStatus;
  edition: string;
  keywords: string[];
  price: number;
  condition: BookCondition;
  isbn: string;
  pages: number;
  quantity: number;
}

const BookSchema = new mongoose.Schema<Book>({
  name: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookCategory',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookShelfSlot'
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publisher'
  },
  title: String,
  publishDate: {
    type: Date,
  },
  language: String,
  description: String,
  status: {
    type: String,
    enum: Object.values(BookStatus)
  },
  edition: String,
  keywords: {
    type: [String],
  },
  price: {
    type: Number,
  },
  condition: {
    type: String,
    enum: Object.values(BookCondition),
  },
  isbn: String,
  pages: Number,
  quantity: Number,
}, {
  timestamps: true,
});

export interface BookDocument extends Document, Book {
}

BookSchema.plugin(paginate);

let model;

try {
  model = mongoose.model('Book');
} catch (e) {
  model = mongoose.model('Book', BookSchema);
}

export const BookModel = model as Model<Book>;
