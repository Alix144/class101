import express from "express";
import { deleteNotification, getByUserId, inviteInstructor, inviteStudent } from "../controllers/invitation.controller.js";

const invitationRouter = express.Router();

invitationRouter.get("/get/:id", getByUserId) // user ID

invitationRouter.post("/instructor", inviteInstructor)
invitationRouter.post("/student", inviteStudent)

invitationRouter.delete("/delete/:id", deleteNotification) // invitation ID

export default invitationRouter;