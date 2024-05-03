import mongoose, {Document, Model} from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import {Category} from "@/lib/models/category.model";

export interface BookAuthor {
  name: string;
  category: string | Category;
}

const BookAuthorSchema = new mongoose.Schema<BookAuthor>({
  name: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookCategory',
  }
}, {
  timestamps: true,
});

export interface BookAuthorDocument extends Document, BookAuthor {
}

BookAuthorSchema.plugin(paginate);

let model;

try {
  model = mongoose.model('BookAuthor');
} catch (e) {
  model = mongoose.model('BookAuthor', BookAuthorSchema);
}

export const BookAuthorModel = model as Model<BookAuthor>;
