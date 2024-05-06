import mongoose, {Document, Model} from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { Location } from './library.model';

export interface Bookcase {
  position: string;
  category: string;
  library: Location;
}

const BookcaseSchema = new mongoose.Schema<Bookcase>({
  position: String,
  category: String,
  library: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  },
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
