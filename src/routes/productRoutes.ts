import express from "express";

import {
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  getProductBySlugHandler,
  getProductsByCategoryHandler,
  getProductsByCategorySlugHandler,
  searchProductsByTitle,
  updateProductHandler,
} from "../controllers/productController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.get("/products", getAllProductsHandler);
router.get("/products/category/:categoryId", getProductsByCategoryHandler);
router.get("/products/category/slug/:slug", getProductsByCategorySlugHandler);

router.post("/create-product", authMiddleware, createProductHandler);

router.patch("/update-product/:_id", authMiddleware, updateProductHandler);

router.delete("/delete-product/:_id", authMiddleware, deleteProductHandler);

router.get("/product/:_id", getProductByIdHandler);
router.get("/product/slug/:slug", getProductBySlugHandler);

router.get("/products/search", searchProductsByTitle);

export default router;
