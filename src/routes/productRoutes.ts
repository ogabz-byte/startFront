import express from "express";
import {
  getProductsWithCategory,
  getProductsByCategory,
} from "../controllers/productControllers";

const router = express.Router();

router.get("/", getProductsWithCategory);
router.get("/category/:categoryId", getProductsByCategory);

export default router;
