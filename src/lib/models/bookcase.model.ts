import mongoose, {Document, Model} from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface Bookcase {
  position: string;
  category: string;
}

const BookcaseSchema = new mongoose.Schema<Bookcase>({
  position: String,
  category: String
}, {timestamps: true});

export interface BookcaseDocument extends Document, Bookcase {
}

BookcaseSchema.plugin(paginate);

let model;

try {
  model = mongoose.model('Bookcase');
} catch (e) {
  model = mongoose.model('Bookcase', BookcaseSchema);
}

export const BookcaseModel = model as Model<BookcaseDocument>;
