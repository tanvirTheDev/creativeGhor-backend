import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/Product";
// Define the product schema
const productSchema: Schema<IProduct> = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    salePrice: { type: Number },
    stock: [String],
    features: [String],
    description: { type: String },
    images: [String], // Array of image URLs from Cloudinary
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
