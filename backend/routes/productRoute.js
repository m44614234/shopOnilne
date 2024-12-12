import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getProducts,
} from "../controllers/productCtrl.js";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);

router.get("/:id", getSingleProduct);

router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

router.get("/", getProducts);

export default router;
