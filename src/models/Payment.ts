import mongoose, { Schema } from "mongoose";
import { IPayment } from "../interfaces/Payment";

const paymentSchema: Schema<IPayment> = new mongoose.Schema(
  {
    transactionId: String,
    userEmail: String,
    amount: Number,
    status: String,
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
