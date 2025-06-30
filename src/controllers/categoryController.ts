import { NextFunction, Request, Response } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
} from "../services/categoryServices";

// Create category (Admin only)
export const createCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categoryData = req.body;
    const result = await createCategory(categoryData);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error: unknown) {
    const err = error as { code?: number };
    if (err.code === 11000) {
      res.status(400).json({
        success: false,
        message: "Category with this name already exists",
      });
      return;
    }
    console.error("Error creating category:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    next(error);
  }
};

// Get all categories
export const getAllCategoriesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await getAllCategories();
    res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error retrieving categories:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    next(error);
  }
};

// Get category by ID
export const getCategoryByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { _id } = req.params;
    const result = await getCategoryById(_id);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error getting category by id:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    next(error);
  }
};

// Get category by slug
export const getCategoryBySlugHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;
    const result = await getCategoryBySlug(slug);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error getting category by slug:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    next(error);
  }
};

// Update category (Admin only)
export const updateCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { _id } = req.params;
    const categoryData = req.body;
    const result = await updateCategory(_id, categoryData);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (error: unknown) {
    const err = error as { code?: number };
    if (err.code === 11000) {
      res.status(400).json({
        success: false,
        message: "Category with this name already exists",
      });
      return;
    }
    console.error("Error updating category:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    next(error);
  }
};

// Delete category (Admin only)
export const deleteCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { _id } = req.params;
    await deleteCategory(_id);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    next(error);
  }
};
