import express from "express";
import {
  createProductComment,
  getProductsComment,
} from "../controllers/productComment.js";

const router = express.Router();

router.post("/create", createProductComment);
router.get("/", getProductsComment);

export default router;
