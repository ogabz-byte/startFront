import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./config/db";
import authRoutes from "./routes/authRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

//middleware
app.use(cors());
app.use(express.json()); // a;;ows parsing json bodies

//routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

//simple test route
app.get("/", (req, res) => {
  res.send("API is running");
});
app.get("/test", (req, res) => {
  console.log("test route hit");
  res.send("test is running");
});

//testing db connect
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    res.json(rows);
  } catch (error) {
    console.error("DB ERROR: ", error);
    res.status(500).send("Database error");
  }
});

//start server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
