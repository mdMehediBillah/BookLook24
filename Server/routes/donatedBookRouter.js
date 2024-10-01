import express from "express";
import {
  countDonatedBooks,
  createDonatedBook,
  deleteDonatedBook,
  getDonatedBook,
  getDonatedBooks,
} from "../controllers/donatedBookController/donatedBook.js";

const donatedBookRouter = express.Router();

donatedBookRouter.post("/new", createDonatedBook);
donatedBookRouter.get("/", getDonatedBooks);
donatedBookRouter.get("/:id", getDonatedBook);
donatedBookRouter.delete("/:id", deleteDonatedBook);
donatedBookRouter.get("/count/all", countDonatedBooks);

export default donatedBookRouter;
