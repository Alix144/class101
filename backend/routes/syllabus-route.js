import express from "express";
import { addSyllabus, getSyllabus } from "../controllers/syllabus-controller.js";

const syllabusRouter = express.Router();

syllabusRouter.get("/", getSyllabus)
syllabusRouter.post("/add", addSyllabus)


export default syllabusRouter;