import mongoose, {Document, Model} from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export enum RoleEnum {
  USER = 'user',
  ADMIN = 'admin',
}

const AccountSchema = new mongoose.Schema<Account>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  birthday: Date,
  fullName: String,
  phoneNumber: String,
  identityNumber: String,
  gender: String,
  profilePicture: String,
  balance: Number,
  address: String,
  status: String,
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
}, {timestamps: true});

export interface AccountDocument extends Document, Account {
}

AccountSchema.plugin(paginate);

export interface AccountDocument extends Document, Account {
}

let model;

try {
  model = mongoose.model('Account');
} catch (e) {
  model = mongoose.model('Account', AccountSchema);
}

export const AccountModel = model as Model<AccountDocument>;
