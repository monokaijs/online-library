import mongoose, {Document, Model} from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface Category {
  name: string;
}

const CategorySchema = new mongoose.Schema<Category>({
  name: String,
}, {
  timestamps: true,
});

export interface CategoryDocument extends Document, Category {
}

CategorySchema.plugin(paginate);

let model;

try {
  model = mongoose.model('Category');
} catch (e) {
  model = mongoose.model('Category', CategorySchema);
}

export const CategoryModel = model as Model<Category>;
