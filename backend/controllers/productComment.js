import asyncHandler from "express-async-handler";
import CommentProduct from "../models/Product_Comment.js";

const createProductComment = asyncHandler(async (req, res) => {
  try {
    const newProductComment = await CommentProduct.create(req.body);
    res.json(newProductComment);
  } catch (error) {
    throw new Error(error);
  }
});

const getProductsComment = asyncHandler(async (req, res) => {
  try {
    const getProductComment = await CommentProduct.find()
      .populate("user")
      .sort({
        createdAt: -1,
      });

    res.json(getProductComment);
  } catch (error) {
    throw new Error(error);
  }
});

export { createProductComment, getProductsComment };
