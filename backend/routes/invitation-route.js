import express from "express";
import { getByUserId, inviteInstructor, inviteStudent } from "../controllers/invitation.controller.js";

const invitationRouter = express.Router();

invitationRouter.get("/get/:id", getByUserId) // user ID

invitationRouter.post("/instructor", inviteInstructor)
invitationRouter.post("/student", inviteStudent)

export default invitationRouter;