import express from "express";
import { uploadImages, deleteImages } from "../controllers/uploadCtrl.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
import { uploadPhoto, productImgResize } from "../utils/uploadImage.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);

router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

export default router;
