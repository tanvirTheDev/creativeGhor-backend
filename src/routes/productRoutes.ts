import express from "express";

import {
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
} from "../controllers/productController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.get("/products", getAllProductsHandler);

router.post("/create-product", authMiddleware, createProductHandler);

router.patch("/update-product/:_id", authMiddleware, updateProductHandler);

router.delete("/delete-product/:_id", authMiddleware, deleteProductHandler);

router.get("/product/:_id", getProductByIdHandler);

export default router;
