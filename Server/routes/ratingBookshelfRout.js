import express from "express";

const ratingBookshelfRout = express.Router();

ratingBookshelfRout.post("/new", newAddRatingBookshelf);

export default ratingBookshelfRout;
