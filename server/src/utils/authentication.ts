import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import User from "../models/User";
import { UserI } from "../models/User.types";
import config from "./config";

interface IData {
  _id: ObjectId;
}

export const authentication = async (token): Promise<UserI> => {
  if (!token) throw new Error("No token provided");
  const data: any = jwt.verify(token.split(" ")[1], config.SECRET);
  if (data) {
    const user = await User.findOne({ _id: data._id }, { password: 0 });
    return user;
  }
};
