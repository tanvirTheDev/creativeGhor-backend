import express from "express";
import authRoutes from "./authRoutes";
import paymentRoutes from "./paymentRoutes";
import productRoutes from "./productRoutes";
const router = express.Router();

// Use auth routes
router.use("/api/v1", authRoutes);

// Use product routes
router.use("/api/v1", productRoutes);

// Use payment routes
router.use("/api/v1/payment", paymentRoutes);

export default router;
