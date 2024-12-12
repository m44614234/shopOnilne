import CommentBlogModel from "../models/Blog_Comment.js"
import asyncHandler from "express-async-handler";

export const createBlogComment = asyncHandler(async (req, res) => {
  try {
    const newBlogCommponent = await CommentBlogModel.create(req.body);
    res.json(newBlogCommponent);
  } catch (error) {
    console.log("error create Blog Comment =>", error);
    throw new Error(error);
  }
});

export const getBlogComments = asyncHandler(async (req, res) => {
  try {
    const getBlogComment = await CommentBlogModel.find().populate("user").sort({
      createdAt: -1,
    })

    res.json(getBlogComment);
  } catch (error) {
    throw new Error(error);
  }
});


