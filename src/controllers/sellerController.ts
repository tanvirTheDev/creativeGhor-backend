import { Request, Response } from "express";
import * as sellerServices from "../services/sellerServices";

export const createSeller = async (req: Request, res: Response) => {
  try {
    const seller = await sellerServices.createSeller(req.body);
    res.status(201).json(seller);
  } catch (error) {
    res.status(500).json({ message: "Failed to create seller", error });
  }
};

export const getAllSellers = async (_req: Request, res: Response) => {
  try {
    const sellers = await sellerServices.getAllSellers();
    res.status(200).json(sellers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sellers", error });
  }
};

export const getSellerById = async (req: Request, res: Response) => {
  try {
    const seller = await sellerServices.getSellerById(req.params.id);
    if (!seller) {
      res.status(404).json({ message: "Seller not found" });
      return;
    }
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seller", error });
  }
};

export const updateSeller = async (req: Request, res: Response) => {
  try {
    const seller = await sellerServices.updateSeller(req.params.id, req.body);
    if (!seller) {
      res.status(404).json({ message: "Seller not found" });
      return;
    }
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: "Failed to update seller", error });
  }
};

export const deleteSeller = async (req: Request, res: Response) => {
  try {
    const seller = await sellerServices.deleteSeller(req.params.id);
    if (!seller) {
      res.status(404).json({ message: "Seller not found" });
      return;
    }
    res.status(200).json({ message: "Seller deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete seller", error });
  }
};
