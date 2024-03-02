import express from "express";
import { addDocument, getClassDocuments } from "../controllers/document-controller.js";

const documentRouter = express.Router();

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

documentRouter.post("/add", upload.single("file"), addDocument)
documentRouter.get("/:id", getClassDocuments)// class id

export default documentRouter;