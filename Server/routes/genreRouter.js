import express from "express";
import {
  createGenre,
  deleteGenre,
  getGenre,
  getGenres,
} from "../controllers/genreController/genre.js";

const genreRouter = express.Router();

genreRouter.post("/new", createGenre);
genreRouter.get("/", getGenres);
genreRouter.get("/:id", getGenre);
genreRouter.delete("/:id", deleteGenre);

export default genreRouter;
