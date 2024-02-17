import express from "express";
import { signup, login, getAllUsers, getUser } from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers)
userRouter.get("/:id", getUser)
userRouter.post("/register", signup)
userRouter.post("/login", login)

export default userRouter;