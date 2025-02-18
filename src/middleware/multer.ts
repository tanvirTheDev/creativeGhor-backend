import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    console.log("File:", req, file);
    return {
      folder: "products",
      format: ["jpg", "jpeg", "png"], // or "png", based on your needs
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`, // Generate a unique ID
    };
  },
});

const upload = multer({ storage });

export default upload;
