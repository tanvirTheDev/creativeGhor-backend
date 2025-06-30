/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { Seller } from "../models/Seller";
import {
  createUser,
  findUserByEmail,
  getUserByIdService,
} from "../services/userServices";
import { generateToken } from "../utils/auth";

interface AuthRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await createUser(req.body);
    const token = generateToken({ id: user._id.toString(), role: user.role });
    res.status(201).json({ token });
  } catch (error: any) {
    res.status(500).json({ message: error?.message || "Unknown error" });
  }
};

export const login = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user || !(await user.comparePassword(password))) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = generateToken({ id: user._id.toString(), role: user.role });
    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ message: error?.message || "Unknown error" });
  }
};

// get user by id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// register seller

export const sellerLogin = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ email });

    if (!seller || !(await seller.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      id: seller._id.toString(),
      role: seller.role,
    });
    res.status(200).json({ token, seller });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Seller login failed", error: error.message });
  }
};
