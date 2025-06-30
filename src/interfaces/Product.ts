import { Document, Types } from "mongoose";

// Define the Product interface extending mongoose Document
export interface IProduct extends Document {
  title: string;
  slug: string; // SEO-friendly URL slug
  category: Types.ObjectId; // Reference to Category
  price: number;
  salePrice?: number | null; // Allow null as a valid type
  stock?: string;
  features?: string[];
  description?: string;
  images: string[]; // Array of image URLs from Cloudinary
}
