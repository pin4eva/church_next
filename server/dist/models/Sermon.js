"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_slug_generator_1 = __importDefault(require("mongoose-slug-generator"));
var Schema = mongoose_1.default.Schema;
var SermonSchema = new Schema({
    topic: { type: String, required: true },
    preachedOn: Date,
    author: { type: String },
    videoUrl: { type: String },
    audioUrl: { type: String },
    scriptures: { type: String },
    excerpt: { type: String },
    body: { type: String },
    slug: { type: String, slug: "topic" },
}, {
    timestamps: true,
});
SermonSchema.plugin(mongoose_slug_generator_1.default);
exports.default = mongoose_1.default.models.Sermon || mongoose_1.default.model("Sermon", SermonSchema);
