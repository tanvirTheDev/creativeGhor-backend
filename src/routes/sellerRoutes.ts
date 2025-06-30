import { Router } from "express";
import * as sellerController from "../controllers/sellerController";
// Assuming authMiddleware exists

const router = Router();

// Only "seller" role can manage these routes (optional)
router.post("/", sellerController.createSeller);
router.get("/", sellerController.getAllSellers);
router.get("/:id", sellerController.getSellerById);
router.put("/:id", sellerController.updateSeller);
router.delete("/:id", sellerController.deleteSeller);

export default router;
