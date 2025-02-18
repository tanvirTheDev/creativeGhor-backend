import "express";

declare module "express" {
  interface Request {
    user?: { userId: string; role: string };
  }
}

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File; // Add the file property
    }
  }
}
