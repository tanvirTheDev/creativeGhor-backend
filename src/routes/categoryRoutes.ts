import express from "express";
import {
  createCategoryHandler,
  deleteCategoryHandler,
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  getCategoryBySlugHandler,
  updateCategoryHandler,
} from "../controllers/categoryController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

// Public routes
router.get("/categories", getAllCategoriesHandler);
router.get("/category/:slug", getCategoryBySlugHandler);
router.get("/category/id/:_id", getCategoryByIdHandler);

// Protected routes (Admin only)
router.post("/create-category", authMiddleware, createCategoryHandler);
router.patch("/update-category/:_id", authMiddleware, updateCategoryHandler);
router.delete("/delete-category/:_id", authMiddleware, deleteCategoryHandler);

export default router;
