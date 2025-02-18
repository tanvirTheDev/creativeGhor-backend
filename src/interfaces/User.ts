import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "admin" | "customer" | "seller";
  comparePassword(candidatePassword: string): Promise<boolean>;
}
