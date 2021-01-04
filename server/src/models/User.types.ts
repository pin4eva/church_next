import { Document, ObjectId } from "mongoose";

export type Ref<T> = T | ObjectId;
export interface UserI extends Document {
  _id?: ObjectId;
  name: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token?: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
  image?: string;
  department?: string;
  fellowship?: string;
  branch?: string;
  role?: string;
  position?: UserPositionsProps;
}

enum UserPositionsProps {
  "Member",
  "Pastor",
  "Worker",
  "HOD",
  "GO",
}
