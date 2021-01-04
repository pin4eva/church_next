import { Schema, model, models } from "mongoose";
import { UserI } from "./User.types";

const UserSchema = new Schema({
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

const User = models.User || model("User", UserSchema);

export default User;
