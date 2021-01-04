import { model, models, Schema, Document, ObjectId } from "mongoose";

export interface DevotionalInterface extends Document {
  _id: ObjectId;
  topic: string;
  date: Date;
  scriptures: string;
  excerpt: string;
  body: string;
}

const DevotionalSchema = new Schema(
  {
    topic: String,
    date: Date,
    scriptures: String,
    excerpt: String,
    body: String,
  },
  {
    timestamps: true,
  }
);

export default models.Devotional ||
  model<DevotionalInterface>("Devotional", DevotionalSchema);
