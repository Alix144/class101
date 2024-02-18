import express from "express";
import { createPost, getAllPosts, getAnswers, addAnswer } from "../controllers/post-controller.js";

const PostRouter = express.Router();

PostRouter.get("/", getAllPosts)
PostRouter.post("/create", createPost)

PostRouter.get("/answers", getAnswers)
PostRouter.post("/answers/add", addAnswer)

export default PostRouter;