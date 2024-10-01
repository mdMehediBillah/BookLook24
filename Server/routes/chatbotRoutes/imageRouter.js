import { Router } from "express";
import { createImage } from "../../controllers/Chatbot/images.js";

const imageRouter = Router();

imageRouter.post("/", createImage);

export default imageRouter;
