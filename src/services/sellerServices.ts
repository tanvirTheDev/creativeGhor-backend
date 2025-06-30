import { ISeller, Seller } from "../models/Seller";

export const createSeller = async (sellerData: Partial<ISeller>) => {
  const seller = new Seller(sellerData);
  return await seller.save();
};

export const getAllSellers = async () => {
  return await Seller.find();
};

export const getSellerById = async (id: string) => {
  return await Seller.findById(id);
};

export const updateSeller = async (
  id: string,
  updateData: Partial<ISeller>
) => {
  return await Seller.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteSeller = async (id: string) => {
  return await Seller.findByIdAndDelete(id);
};
