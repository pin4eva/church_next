import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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

export default mongoose.models.User || mongoose.model("User", UserSchema);
