import express from "express";
import { inviteInstructor, inviteStudent } from "../controllers/invitation.controller.js";

const invitationRouter = express.Router();

invitationRouter.post("/instructor", inviteInstructor)
invitationRouter.post("/student", inviteStudent)

export default invitationRouter;