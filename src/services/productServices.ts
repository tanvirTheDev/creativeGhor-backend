import { IProduct } from "../interfaces/Product";
import { Product } from "../models/Product";

export const createProduct = async (
  productData: IProduct
): Promise<IProduct> => {
  const product = new Product(productData);
  return await product.save();
};

export const getProducts = async (): Promise<IProduct[]> => {
  return await Product.find();
};

export const deleteProduct = async (_id: string): Promise<void> => {
  await Product.findByIdAndDelete(_id);
};

export const updateProduct = async (
  _id: string,
  productData: IProduct
): Promise<void> => {
  await Product.findByIdAndUpdate(_id, productData);
};

export const getProductById = async (_id: string): Promise<IProduct | null> => {
  return await Product.findById(_id);
};
