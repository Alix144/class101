import express from "express";
import { signup, login, getAllUsers, getUser, updateUser, addBg } from "../controllers/user-controller.js";

const userRouter = express.Router();

import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../frontend/src/uploaded-imgs");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});
const upload = multer({ storage: storage });

userRouter.put("/addBg/:id", upload.single("file"), addBg) // user id

userRouter.get("/", getAllUsers)
userRouter.get("/:id", getUser)
userRouter.post("/register", signup)
userRouter.post("/login", login)
userRouter.put("/update", updateUser)

export default userRouter;