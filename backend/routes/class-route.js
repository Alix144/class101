import express from "express";
import { createClass, getByUserId, updateClass, getById, joinClass, addBg, getAllClasses } from "../controllers/class-controller.js";

const classRouter = express.Router();


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

classRouter.put("/addBg/:id", upload.single("file"), addBg) // this id is for class

classRouter.post("/create", createClass)
classRouter.put("/edit/:id", updateClass)//this id is for class
classRouter.put("/join/:id", joinClass)//this id is for user
classRouter.get("/view/:id", getByUserId)// this id is for user
classRouter.get("/view/class/:id", getById)// this id is for class
classRouter.get("/", getAllClasses)

export default classRouter;