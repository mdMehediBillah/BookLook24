import mongoose from "mongoose";

const { Schema } = mongoose;

const bookshelfSchema = new Schema(
  {
    barcode: { type: String, unique: true },
    image: [{ type: String, required: true }],
    name: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    street: { type: String, required: true },
    longitude: { type: String },
    latitude: { type: String },
    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true },

    books: [{ type: Schema.Types.ObjectId, ref: "Book" }],

    donatedBooks: [
      { _id: { type: mongoose.Types.ObjectId, ref: "DonatedBook" } },
    ],

    borrowedBooks: [
      {
        _id: { type: mongoose.Types.ObjectId, ref: "BorrowedBook" },
      },
    ],

    // Average rating of a book shelf
    ratings: { type: Number },
    // Individual user review for rating a book shelf
    reviews: [
      {
        user: { type: Object },
        rating: { type: Number },
        comment: { type: String },
        shelfId: { type: String },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: true }
);

const Bookshelf = mongoose.model("Bookshelf", bookshelfSchema);
export default Bookshelf;
