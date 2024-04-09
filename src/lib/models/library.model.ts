import mongoose, {Document, Model} from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export enum LibraryStatus {
  OPENING = 'opening',
  TEMPORARY_CLOSED = 'temporary_closed',
  CLOSED = 'closed'
}

export interface Library {
  name: string;
  openingTime: string;
  closingTime: string;
  phoneNumber: string;
  address: {
    text: string;
    coordinate: {
      lat: number;
      lng: number;
    },
  };
  status: LibraryStatus;
  estDate: Date;
}

const LibrarySchema = new mongoose.Schema<Library>({
  name: String,
  openingTime: String,
  closingTime: String,
  phoneNumber: String,
  address: {
    text: String,
    coordinate: {
      lat: Number,
      lng: Number,
    }
  },
  status: {
    type: String,
    enum: Object.values(LibraryStatus),
  },
  estDate: Date,
}, {timestamps: true});

export interface LibraryDocument extends Document, Library {
}

LibrarySchema.plugin(paginate);

let model;

try {
  model = mongoose.model('Library');
} catch (e) {
  model = mongoose.model('Library', LibrarySchema);
}

export const LibraryModel = model as Model<LibraryDocument>;
