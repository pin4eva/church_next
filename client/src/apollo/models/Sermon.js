import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
const Schema = mongoose.Schema;

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
