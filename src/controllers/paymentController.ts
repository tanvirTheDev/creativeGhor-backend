import { Request, Response } from "express";
import { Payment } from "../models/Payment";
import { initiateSslPayment } from "../services/paymentServices";

export const initiatePayment = async (req: Request, res: Response) => {
  try {
    const { amount, user_email } = req.body;
    const paymentUrl = await initiateSslPayment(amount, user_email);
    res.json({ url: paymentUrl });
  } catch (error) {
    res.status(500).json({ message: "Payment initiation failed", error });
  }
};

export const paymentSuccessful = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;
    const { userEmail, amount } = req.body;

    if (!transactionId || !userEmail || !amount) {
      return res.status(400).json({ message: "Invalid payment data" });
    }

    // Prevent duplicate transactions
    const existingPayment = await Payment.findOne({ transactionId });
    if (existingPayment) {
      return res.status(200).json({ message: "Payment already recorded" });
    }

    // Save payment to MongoDB
    const payment = new Payment({
      transactionId,
      userEmail,
      amount,
      status: "Success",
    });

    const result = await payment.save();

    console.log("✅ Payment saved:", payment);
    res.json({
      success: true,
      message: "Payment recorded successfully",
      data: result,
    });
  } catch (error) {
    console.error("❌ Error saving payment:", error);
    res.status(500).json({ message: "Server error" });
  }
};
