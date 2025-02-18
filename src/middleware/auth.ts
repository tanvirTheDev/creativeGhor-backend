import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/auth";

// Extend Express Request to include `user`
interface AuthenticatedRequest extends Request {
  user?: any; // You can replace `any` with a specific user type, e.g., `UserType`
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // No TypeScript error now
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export const roleMiddleware = (role: string) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user || req.user.role !== role) {
      res.status(403).json({ message: "Access denied" });
      return;
    }
    next();
  };
};
