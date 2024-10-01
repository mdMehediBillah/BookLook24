import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./database/index.js";

// Routes
import authUserRouter from "./routes/authUserRouter.js";
import userRouter from "./routes/userRouter.js";
import bookshelfRouter from "./routes/bookshelfRouter.js";
import bookRouter from "./routes/bookRouter.js";
import commentRouter from "./routes/commentRouter.js";
import genreRouter from "./routes/genreRouter.js";
import ratingRouter from "./routes/ratingRouter.js";
import borrowedBookRouter from "./routes/borrowedBookRouter.js";
import donatedBookRouter from "./routes/donatedBookRouter.js";
import globalErrorHandler from "./middlewares/globalError/index.js";
import subscribeRouter from "./routes/subscribeRouter.js";
import likeShelfRouter from "./routes/likeShefeRouter.js";

//chatbot
import chatRouter from "./routes/chatbotRoutes/chatRouter.js";
import imageRouter from "./routes/chatbotRoutes/imageRouter.js";
import errorHandler from "./middlewares/chatbot/errorHandler.js";
import validateProvider from "./middlewares/chatbot/validateProvider.js";
import validateMode from "./middlewares/chatbot/validateMode.js";

// Import routes

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })

  //   // cors({
  //   //   origin: "http://localhost:5174",
  //   //   credentials: true,
  //   // })
);
// app.use(cors({ origin: "*" , credentials: true,}), express.json(), validateProvider, validateMode);

app.use(express.json());

// Routes
app.use("/api/v1/auth", authUserRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/bookshelves", bookshelfRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/genres", genreRouter);
app.use("/api/v1/ratings", ratingRouter);
app.use("/api/v1/borrowedBooks", borrowedBookRouter);
app.use("/api/v1/donatedBooks", donatedBookRouter);
app.use("/api/v1/subscribe", subscribeRouter);
app.use("/api/v1/likeShelf", likeShelfRouter);

//chatbotRoutes
app.use("/api/v1/chat/completions", chatRouter);
app.use("/api/v1/images/generations", imageRouter);

// Static assets
app.use(express.static("assets"));

// Global error handler
app.use(globalErrorHandler);

app.use(errorHandler);

// Server Listener
const port = process.env.PORT || 8000;

// Invalid endpoint
app.get("/*", (req, res) => {
  res.send("invalid endpoint!");
});

app.listen(port, () => {
  console.log("Server is running on port http://localhost:8000/");
});
