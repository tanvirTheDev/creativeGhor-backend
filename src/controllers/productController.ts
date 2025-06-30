import { NextFunction, Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductBySlug,
  getProducts,
  getProductsByCategory,
  getProductsByCategorySlug,
  updateProduct,
} from "../services/productServices";

// create product
export const createProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const productData = req.body;
    const result = await createProduct(productData);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

// get all products

export const getAllProductsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await getProducts();
    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

// get products by category
export const getProductsByCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { categoryId } = req.params;
    const result = await getProductsByCategory(categoryId);
    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error retrieving products by category:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

// get products by category slug (for frontend URLs)
export const getProductsByCategorySlugHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;
    const result = await getProductsByCategorySlug(slug);
    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error retrieving products by category slug:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

// delete product
export const deleteProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { _id } = req.params;
    const result = await deleteProduct(_id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

// update product
export const updateProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { _id } = req.params;
    const payload = req.body;
    const { ...productData } = payload;
    const result = await updateProduct(_id, productData);
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

// get product by id
export const getProductByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { _id } = req.params;
    const result = await getProductById(_id);

    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error getting product by id:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

// get product by slug (for SEO-friendly URLs)
export const getProductBySlugHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;
    const result = await getProductBySlug(slug);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error getting product by slug:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};
