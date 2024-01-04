import mongoose, { Document, Model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export enum RoleEnum {
  USER = 'user',
  ADMIN = 'admin',
}

const AccountSchema = new mongoose.Schema<Account>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      max: 24,
      min: 4,
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    joinDate: {
      type: Date,
    },
    role: {
      type: String,
      enum: RoleEnum,
      default: RoleEnum.USER,
    },
    googleId: {
      type: String,
    },
  },
  { timestamps: true }
);

export interface AccountDocument extends Document, Account {}

AccountSchema.plugin(paginate);

export interface AccountDocument extends Document, Account {}

let model;

try {
  model = mongoose.model('Account');
} catch (e) {
  model = mongoose.model('Account', AccountSchema);
}

export const AccountModel = model as Model<AccountDocument>;
