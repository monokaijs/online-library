import mongoose, {Document, Model} from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface BookShelf {
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  },
  name: {
    type: String,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  capacity: {
    type: Number,
  }
}

const BookShelfSchema = new mongoose.Schema<BookShelf>({
  name: String,
}, {
  timestamps: true,
});

export interface BookShelfDocument extends Document, BookShelf {
}

BookShelfSchema.plugin(paginate);

let model;

try {
  model = mongoose.model('BookShelf');
} catch (e) {
  model = mongoose.model('BookShelf', BookShelfSchema);
}

export const BookShelfModel = model as Model<BookShelf>;
