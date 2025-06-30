import { Types } from "mongoose";
import { IProduct } from "../interfaces/Product";
import { Category } from "../models/Category";
import { Product } from "../models/Product";
import { generateUniqueSlug } from "../utils/slug";

export const createProduct = async (
  productData: IProduct
): Promise<IProduct> => {
  // Generate unique slug from title
  const slug = await generateUniqueSlug(productData.title, Product);
  const product = new Product({ ...productData, slug });
  return await product.save();
};

export const getProducts = async (): Promise<IProduct[]> => {
  return await Product.find().populate("category");
};

export const getProductsByCategory = async (
  categoryId: string
): Promise<IProduct[]> => {
  return await Product.find({
    category: new Types.ObjectId(categoryId),
  }).populate("category");
};

export const getProductsByCategorySlug = async (
  slug: string
): Promise<IProduct[]> => {
  // First find the category by slug
  const category = await Category.findOne({ slug, isActive: true });
  if (!category) {
    return [];
  }

  // Then find products by category ObjectId
  return await Product.find({ category: category._id }).populate("category");
};

export const deleteProduct = async (_id: string): Promise<void> => {
  await Product.findByIdAndDelete(_id);
};

export const updateProduct = async (
  _id: string,
  productData: IProduct
): Promise<void> => {
  // If title is being updated, generate new slug
  if (productData.title) {
    const slug = await generateUniqueSlug(productData.title, Product);
    await Product.findByIdAndUpdate(_id, { ...productData, slug });
  } else {
    await Product.findByIdAndUpdate(_id, productData);
  }
};

export const getProductById = async (_id: string): Promise<IProduct | null> => {
  return await Product.findById(_id).populate("category");
};

export const getProductBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  return await Product.findOne({ slug }).populate("category");
};
