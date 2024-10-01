import express from "express";
import {
  countComments,
  createComment,
  deleteComment,
  getAllComments,
  getComment,
} from "../controllers/commentsController/comment.js";

// Comment Router
const commentRouter = express.Router();

// comment routes
commentRouter.post("/:id/new", createComment);
commentRouter.get("/:id", getComment);
commentRouter.delete("/:userId/:commentId", deleteComment);
commentRouter.get("/", getAllComments);
commentRouter.get("/count/all/comments", countComments);

// Export comment router
export default commentRouter;
