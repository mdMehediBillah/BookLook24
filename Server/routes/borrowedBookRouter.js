import express from "express";
import {
  countBorrowedBooks,
  createBorrowedBook,
  deleteBorrowedBook,
  getBorrowedBook,
  getBorrowedBooks,
} from "../controllers/borrowBookController/borrowBook.js";

const borrowedBookRouter = express.Router();

borrowedBookRouter.post("/new", createBorrowedBook);
borrowedBookRouter.get("/", getBorrowedBooks);
borrowedBookRouter.get("/:id", getBorrowedBook);
borrowedBookRouter.delete("/:id", deleteBorrowedBook);
borrowedBookRouter.get("/count/all", countBorrowedBooks);

export default borrowedBookRouter;
