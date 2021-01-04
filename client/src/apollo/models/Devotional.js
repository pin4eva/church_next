import mongoose from "mongoose";
const Schema = mongoose.Schema;

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

export default mongoose.models.Devotional ||
  mongoose.model("Devotional", DevotionalSchema);
