import cors from "cors";
import express from "express";
import connectDB from "./config/db";
import { PORT } from "./config/env";
import routes from "./routes";
import { migrateExistingProductsToSlugs } from "./utils/migrateSlugs";

const app = express();

// Middleware
const corsOptions = {
  origin: ["http://localhost:3000", "https://qmmerce.vercel.app"], // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies, headers, etc.)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //
// Use combined routes
app.use(routes);

// Connect to MongoDB and run migrations
const startServer = async () => {
  await connectDB();

  // Run slug migration for existing products
  await migrateExistingProductsToSlugs();

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  // Start Server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer().catch(console.error);
