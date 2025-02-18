import { Document } from "mongoose";

// Define the Product interface extending mongoose Document
export interface IPayment extends Document {
  transactionId: string;
  userEmail: string;
  amount: number;
  status: string;
}
