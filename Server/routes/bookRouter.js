import express from "express";
import {
  countBooks,
  createBook,
  deleteBook,
  getBook,
  getBookRating,
  getBooks,
  updateBook,
  updateBookRating,
} from "../controllers/booksControllers/book.js";

const bookRouter = express.Router();

bookRouter.post("/new", createBook);
bookRouter.put("/:id", updateBook);
bookRouter.get("/", getBooks);
bookRouter.get("/:id", getBook);
bookRouter.delete("/:id", deleteBook);

// Additional routes
bookRouter.get("/count/total", countBooks);
bookRouter.put("/:bookId/rating", updateBookRating);
bookRouter.get("/:bookId/rating", getBookRating);

export default bookRouter;
