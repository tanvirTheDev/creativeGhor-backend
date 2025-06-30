import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/Product";
// Define the product schema
const productSchema: Schema<IProduct> = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // SEO-friendly URL slug
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    salePrice: { type: Number },
    stock: [String],
    features: [String],
    description: { type: String },
    images: [String], // Array of image URLs from Cloudinary
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
