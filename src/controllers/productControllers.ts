import { Request, Response } from "express";
import pool from "../config/db";

export const getProductsWithCategory = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.id, p.name, p.price, c.id AS categoryId, c.name AS categoryName
      FROM products p
      JOIN categories c ON p.category_id = c.id
      ORDER BY c.id, p.id
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error fetching products" });
  }
};

//id
export const getProductsByCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  try {
    const [products] = await pool.query(
      "SELECT * FROM products WHERE category_id = ?",
      [categoryId]
    );
    res.json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Server error fetching products" });
  }
};
