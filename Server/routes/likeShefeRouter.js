import express from "express";

import {
  checkLikedStatus,
  getAllLikedShelves,
  likeShelfController,
} from "../controllers/likeShelfRouter/likeShelfController.js";
import { removeLikedBookshelf } from "../controllers/likeShelfRouter/removeLikedBookshelf,js";

const likeShelfRouter = express.Router();

likeShelfRouter.get("/likedBookshelves/:userId", getAllLikedShelves);
likeShelfRouter.get("/likeShelf/status", checkLikedStatus);
likeShelfRouter.post("/", likeShelfController);
likeShelfRouter.delete(
  "/unlikeBookshelf/:userId/:shelfId",

  removeLikedBookshelf
);

export default likeShelfRouter;
//   protect,
