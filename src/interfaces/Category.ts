import { Document } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  slug: string;
  isActive: boolean;
}
