import express from "express";
import { getMessages, sendMessage } from "../controllers/message-controller.js";

const messageRouter = express.Router();

messageRouter.get("/:id", getMessages) //class id
messageRouter.post("/send", sendMessage)


export default messageRouter;