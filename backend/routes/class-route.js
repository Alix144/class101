import express from "express";
import { createClass, getByUserId, updateClass, getById, joinClass } from "../controllers/class-controller.js";

const classRouter = express.Router();

classRouter.post("/create", createClass)
classRouter.put("/edit/:id", updateClass)//this id is for class
classRouter.put("/join/:id", joinClass)//this id is for user
classRouter.get("/view/:id", getByUserId)// this id is for user
classRouter.get("/view/class/:id", getById)// this id is for class

export default classRouter;