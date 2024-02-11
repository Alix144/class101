import express from "express";
import { addAnnouncement, deleteAnnouncement, getAllAnnouncements, getById, updateAnnouncement } from "../controllers/announcement-controller.js";

const announcementRouter = express.Router();

announcementRouter.get("/", getAllAnnouncements)
announcementRouter.post("/add", addAnnouncement)
announcementRouter.put("/update/:id", updateAnnouncement)
announcementRouter.delete("/delete/:id", deleteAnnouncement)

export default announcementRouter;