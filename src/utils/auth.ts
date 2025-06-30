import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

// Interface for token payload
interface TokenPayload {
  id: string;
  role: "customer" | "seller" | "admin";
}

// Generate a JWT token
export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

// Verify a JWT token
export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};
