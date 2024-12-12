import express from "express";
import { createBlogComment, getBlogComments } from '../controllers/blogComment.js'


const router = express.Router();

router.post("/create", createBlogComment);
router.get("/", getBlogComments);


export default router;