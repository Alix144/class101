import express from "express";
import { submitAssignment, getClassSubmittedHws, getUserSubmittedHws, getById, gradeAssignment } from "../controllers/submittedHw-controller.js";

const submittedHwsRouter = express.Router();

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

submittedHwsRouter.post("/submit", upload.single("file"), submitAssignment)
submittedHwsRouter.get("/:id", getClassSubmittedHws)// class id
submittedHwsRouter.get("/user/:id", getUserSubmittedHws)// user id
submittedHwsRouter.get("/details/:id", getById)// submitted assignment id
submittedHwsRouter.put("/grade/:id", gradeAssignment)// submitted assignment id

export default submittedHwsRouter;