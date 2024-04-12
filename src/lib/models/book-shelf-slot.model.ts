import mongoose, {Document, Model} from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import {BookShelf} from "@/lib/models/book-shelf.model";

export interface BookShelfSlot {
  shelf: string | BookShelf;
  code: string;
}

const BookShelfSlotSchema = new mongoose.Schema<BookShelfSlot>({
  shelf: {
    type: mongoose.Schema.Types.ObjectId,
    name: 'BookShelf',
  },
  code: {
    type: String,
    unique: true,
  },
}, {
  timestamps: true,
});

export interface BookShelfSlotDocument extends Document, BookShelfSlot {
}

BookShelfSlotSchema.plugin(paginate);

let model;

try {
  model = mongoose.model('BookShelfSlot');
} catch (e) {
  model = mongoose.model('BookShelfSlot', BookShelfSlotSchema);
}

export const BookShelfSlotModel = model as Model<BookShelfSlot>;
