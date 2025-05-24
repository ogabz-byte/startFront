import { Request, Response } from "express";
import pool from "../config/db";

export const getCategories = async (req: Request, res: Response) => {
  console.log("GET /api/categories called"); // <-- confirm route hit

  try {
    const [categories] = await pool.query("SELECT * FROM categories");
    console.log("Categories fetched:", categories);
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error fetching categories" });
  }
};
