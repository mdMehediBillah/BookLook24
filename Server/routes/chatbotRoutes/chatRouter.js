import { Router } from "express";
import { createChat } from "../../controllers/Chatbot/chats.js";

const chatRouter = Router();

chatRouter.post("/", createChat);

export default chatRouter;
