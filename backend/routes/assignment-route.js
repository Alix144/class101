import express from "express";
import { addAssignment, getClassAssignments } from "../controllers/assignment-controller.js";

const assignmentRouter = express.Router();

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

assignmentRouter.post("/add", upload.single("file"), addAssignment)
assignmentRouter.get("/:id", getClassAssignments)// class id

export default assignmentRouter;