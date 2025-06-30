import express from "express";
import authRoutes from "./authRoutes";
import categoryRoutes from "./categoryRoutes";
import paymentRoutes from "./paymentRoutes";
import productRoutes from "./productRoutes";
import sellerRoutes from "./sellerRoutes";
const router = express.Router();

// Use auth routes
router.use("/api/v1", authRoutes);

// Use category routes
router.use("/api/v1", categoryRoutes);

// Use product routes
router.use("/api/v1", productRoutes);

// Use payment routes
router.use("/api/v1/payment", paymentRoutes);

router.use("/api/v1", sellerRoutes);

export default router;
