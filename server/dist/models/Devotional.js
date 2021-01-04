"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var DevotionalSchema = new mongoose_1.Schema({
    topic: String,
    date: Date,
    scriptures: String,
    excerpt: String,
    body: String,
}, {
    timestamps: true,
});
exports.default = mongoose_1.models.Devotional ||
    mongoose_1.model("Devotional", DevotionalSchema);
