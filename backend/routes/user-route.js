import express from "express";
import { signup, login, getAllUsers, getUser, updateUser } from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers)
userRouter.get("/:id", getUser)
userRouter.post("/register", signup)
userRouter.post("/login", login)
userRouter.put("/update", updateUser)

export default userRouter;