import express from "express";
import { createClass, getByUserId, updateClass } from "../controllers/class-controller.js";

const classRouter = express.Router();

classRouter.post("/create", createClass)
classRouter.put("/edit/:id", updateClass)//this id is for class
classRouter.get("/view/:id", getByUserId)// this id is for user

export default classRouter;