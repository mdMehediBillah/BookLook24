import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    coverImageUrl: {
      type: String,
      required: false,
      default:
        "https://res.cloudinary.com/dgmthsu2w/image/upload/v1722802058/bookCover_giftfu.png",
    },
    language: { type: String, required: false, default: "eng" },
    summary: { type: String, required: false },
    bookshelf: {
      type: Schema.Types.ObjectId,
      ref: "Bookshelf",
      required: true,
    },
    borrowedTimes: [
      {
        _id: { type: mongoose.Types.ObjectId, ref: "BorrowedBook" },
      },
    ],
    status: {
      type: String,
      default: "available",
      enum: ["available", "borrowed"],
    },

    ratings: [{ type: Number }],
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
