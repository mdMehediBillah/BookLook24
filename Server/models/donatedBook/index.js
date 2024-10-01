import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Define the DonatedBook schema
const donatedBookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    ISBN: { type: String, trim: true, unique: true },
    message: { type: String },
    dateDonated: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Create the model for DonatedBook
const DonatedBook = model("DonatedBook", donatedBookSchema);

export default DonatedBook;
