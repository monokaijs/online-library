import mongoose, {Document, Model} from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import {Category} from "@/lib/models/category.model";

export interface Publisher {
  name: string;
  address: string;
  description: string;
}

const PublisherSchema = new mongoose.Schema<Publisher>({
  name: String,
  address: String,
  description: String,
}, {
  timestamps: true,
});

export interface PublisherDocument extends Document, Publisher {
}

PublisherSchema.plugin(paginate);

let model;

try {
  model = mongoose.model('Publisher');
} catch (e) {
  model = mongoose.model('Publisher', PublisherSchema);
}

export const PublisherModel = model as Model<Publisher>;
