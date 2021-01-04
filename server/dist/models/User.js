"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    username: String,
    name: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    token: String,
    phone: String,
    address: String,
    isActive: { type: Boolean, default: false },
    image: {
        type: String,
        default: "https://gravatar.com/avatar",
    },
    department: String,
    fellowship: String,
    branch: String,
    role: { type: String, default: "User" },
    position: { type: String, default: "Member" },
});
var User = mongoose_1.models.User || mongoose_1.model("User", UserSchema);
exports.default = User;
