import mongoose, {Document, Model} from 'mongoose';

const AccountVerificationSchema = new mongoose.Schema<AccountVerification>({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  code: {
    type: String,
    unique: true,
  },
}, {
  timestamps: true,
  expireAfterSeconds: 24 * 3600 // expires after 24 hours
});

export interface AccountVerificationDocument extends Document, AccountVerification {
}

let model;

try {
  model = mongoose.model('AccountVerification');
} catch (e) {
  model = mongoose.model('AccountVerification', AccountVerificationSchema);
}

export const AccountVerificationModel = model as Model<AccountVerificationDocument>;
