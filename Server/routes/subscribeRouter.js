import express from "express";
import { subscriptionAdd } from "../controllers/subscriptionControler/subscriptionControler.js";

const subscribeRouter = express.Router();

subscribeRouter.post("/new", subscriptionAdd);

export default subscribeRouter;
