// @ts-ignore
import SSLCommerzPayment from "sslcommerz-lts";
// Adjust the import path based on the package structure
import {
  BACKEND_URL,
  SSLCOMMERZ_STORE_ID,
  SSLCOMMERZ_STORE_PASSWORD,
} from "../config/env";
import { Payment } from "../models/Payment";

export const initiateSslPayment = async (
  amount: number,
  user_email: string
) => {
  const transactionId = "txn_" + new Date().getTime();

  const data = {
    total_amount: amount,
    currency: "BDT",
    tran_id: transactionId,
    success_url: `${BACKEND_URL}/api/v1/payment/success/${transactionId}`,
    fail_url: `${BACKEND_URL}/api/v1/payment/fail/${transactionId}`,
    cancel_url: `${BACKEND_URL}/api/payment/cancel/${transactionId}`,
    ipn_url: `${BACKEND_URL}/api/payment/ipn/${transactionId}`,
    shipping_method: "NO",
    product_name: "EliteGadget Product",
    product_category: "Electronics",
    product_profile: "general",
    cus_name: "Customer",
    cus_email: user_email,
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1206",
    cus_country: "Bangladesh",
    cus_phone: "01700000000",
  };

  const sslcz = new SSLCommerzPayment(
    SSLCOMMERZ_STORE_ID,
    SSLCOMMERZ_STORE_PASSWORD,
    false
  );
  const apiResponse = await sslcz.init(data);
  return apiResponse.GatewayPageURL;
};

export const paymentSuccess = async (
  transactionId: string,
  userEmail: string,
  amount: number
) => {
  await Payment.create({
    transactionId,
    userEmail,
    amount,
    status: "Success",
  });
};
