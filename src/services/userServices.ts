import { IUser } from "../interfaces/User";
import User from "../models/User";

export const createUser = async (userData: IUser): Promise<IUser> => {
  const user = new User(userData);
  return await user.save();
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};

// get user by id

export const getUserByIdService = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

// import { Request, Response } from "express";
// import User from "./userModel";

// export const getUserById = async (req: Request, res: Response) => {
//   try {
//     const user = await User.findById(req.params.id).select("email name role");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
