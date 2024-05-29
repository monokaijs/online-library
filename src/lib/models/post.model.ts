import mongoose, { Document, Model } from "mongoose";
import paginate from "mongoose-paginate-v2";

export enum PostStatus {
  PRIVATE = "private",
  PUBLIC = "public",
  PENDING = "pending",
  CANCELLED = "cancelled",
}

export interface IPost {
  title: string;
  content: string;
  author: Account;
  status: PostStatus;
  isDelete: boolean;
}

const PostSchema = new mongoose.Schema<IPost>(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    title: String,
    content: String,
    status: {
      type: String,
      enum: Object.values(PostStatus),
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export interface PostDocument extends Document, IPost {}

PostSchema.plugin(paginate);

let model;

try {
  model = mongoose.model("Post");
} catch (e) {
  model = mongoose.model("Post", PostSchema);
}

export const PostModel = model as Model<PostDocument>;
