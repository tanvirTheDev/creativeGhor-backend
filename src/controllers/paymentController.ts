/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import SSLCommerzPayment from "sslcommerz-lts";
const store_id = "testbox";
const store_passwd = "qwerty";
const is_live = false;

export const initiatePayment = async (req: Request, res: Response) => {
  const {
    amount,
    currency,
    tran_id,
    success_url,
    fail_url,
    cancel_url,
    ...customerInfo
  } = req.body;

  const data = {
    total_amount: amount,
    currency: currency || "BDT",
    tran_id: tran_id || Date.now().toString(),
    success_url,
    fail_url,
    cancel_url,
    ...customerInfo,
    product_category: "Ecommerce",
    emi_option: 0,
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz
    .init(data)
    .then((apiResponse: any) => {
      console.log("SSLCOMMERZ API Response:", apiResponse);
      let GatewayPageURL = apiResponse.GatewayPageURL;
      res.json({ url: GatewayPageURL });
    })
    .catch((e: any) => {
      res.status(500).json({ error: "Payment initiation failed", details: e });
    });
};
