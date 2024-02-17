import express from "express";
import { createPost, getAllPosts } from "../controllers/post-controller.js";

const PostRouter = express.Router();

PostRouter.get("/", getAllPosts)
PostRouter.post("/create", createPost)

export default PostRouter;