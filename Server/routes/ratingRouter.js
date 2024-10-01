import express from "express";
import {
  createRating,
  deleteRating,
  getRating,
  getRatings,
} from "../controllers/ratingController/rating.js";

const ratingRouter = express.Router();

ratingRouter.post("/new", createRating);
ratingRouter.get("/", getRatings);
ratingRouter.get("/:id", getRating);
ratingRouter.delete("/:id", deleteRating);

export default ratingRouter;
