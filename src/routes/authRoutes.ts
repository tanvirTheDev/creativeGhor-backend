/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { getUserById, login, register } from "../controllers/authController";
import { verifyToken } from "../utils/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user/:id", verifyToken as any, getUserById as any);

export default router;
