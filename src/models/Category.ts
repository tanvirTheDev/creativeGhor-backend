import mongoose, { Schema } from "mongoose";
import { ICategory } from "../interfaces/Category";

const categorySchema: Schema<ICategory> = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
    slug: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Generate slug from name before validation
categorySchema.pre<ICategory>("validate", function (next) {
  if (!this.isModified("name")) return next();

  this.slug = this.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  next();
});

export const Category = mongoose.model<ICategory>("Category", categorySchema);
