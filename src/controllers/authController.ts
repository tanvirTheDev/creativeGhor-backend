import { Request, Response } from "express";
import {
  createUser,
  findUserByEmail,
  getUserByIdService,
} from "../services/userServices";
import { generateToken } from "../utils/auth";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await createUser(req.body);
    const token = generateToken(user._id.toString(), user.role);
    res.status(201).json({ token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user || !(await user.comparePassword(password))) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    const token = generateToken(user._id.toString(), user.role);
    res.json({ token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// get user by id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
