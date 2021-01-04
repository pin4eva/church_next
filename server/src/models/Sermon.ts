import mongoose, { Document, ObjectId } from "mongoose";
import slug from "mongoose-slug-generator";
import { Ref, UserI } from "./User.types";
const Schema = mongoose.Schema;

export interface SermonI extends Document {
  _id: ObjectId;
  topic: string;
  preachedOn: Date;
  videoUrl: string;
  audioUrl: string;
  scriptures: string;
  excerpt: string;
  body: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  author: Ref<UserI>;
}

const SermonSchema = new Schema(
  {
    topic: { type: String, required: true },
    preachedOn: Date,
    author: { type: String },
    videoUrl: { type: String },
    audioUrl: { type: String },
    scriptures: { type: String },
    excerpt: { type: String },
    body: { type: String },
    slug: { type: String, slug: "topic" },
  },
  {
    timestamps: true,
  }
);

SermonSchema.plugin(slug);

export default mongoose.models.Sermon || mongoose.model("Sermon", SermonSchema);
