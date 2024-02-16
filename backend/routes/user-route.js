import express from "express";
import { signup, login, getAllUsers } from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers)
userRouter.post("/register", signup)
userRouter.post("/login", login)

export default userRouter;