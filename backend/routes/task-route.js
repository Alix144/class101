import express from "express";
import { getAllTasks, addTask, updateTask, getById, deleteTask, getByUserId, completeTask } from "../controllers/task-controller.js";

const taskRouter = express.Router();

taskRouter.post("/add", addTask)
taskRouter.get("/view/:id", getByUserId)// this id is for user
taskRouter.put("/edit/:id", updateTask)//this id is for task
taskRouter.get("/details/:id", getById)//this id is for task
taskRouter.put("/complete/:id", completeTask)//this id is for task
taskRouter.delete("/delete/:id", deleteTask)//this id is for task

export default taskRouter;