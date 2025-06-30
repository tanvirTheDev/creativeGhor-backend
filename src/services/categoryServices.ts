import { ICategory } from "../interfaces/Category";
import { Category } from "../models/Category";

export const createCategory = async (
  categoryData: Partial<ICategory>
): Promise<ICategory> => {
  const category = new Category(categoryData);
  return await category.save();
};

export const getAllCategories = async (): Promise<ICategory[]> => {
  return await Category.find({ isActive: true }).sort({ name: 1 });
};

export const getCategoryById = async (
  _id: string
): Promise<ICategory | null> => {
  return await Category.findById(_id);
};

export const getCategoryBySlug = async (
  slug: string
): Promise<ICategory | null> => {
  return await Category.findOne({ slug, isActive: true });
};

export const updateCategory = async (
  _id: string,
  categoryData: Partial<ICategory>
): Promise<ICategory | null> => {
  return await Category.findByIdAndUpdate(_id, categoryData, { new: true });
};

export const deleteCategory = async (_id: string): Promise<void> => {
  await Category.findByIdAndDelete(_id);
};

export const deactivateCategory = async (
  _id: string
): Promise<ICategory | null> => {
  return await Category.findByIdAndUpdate(
    _id,
    { isActive: false },
    { new: true }
  );
};
