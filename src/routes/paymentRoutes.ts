import express, { RequestHandler } from "express";
import {
  initiatePayment,
  paymentSuccessful,
} from "../controllers/paymentController";

const router = express.Router();

router.post("/initiate-payment", initiatePayment as RequestHandler);
router.post("/success/:transactionId", paymentSuccessful as RequestHandler);

export default router;
