import mongoose from "mongoose";

const { Schema } = mongoose;

const ratingSchema = new Schema(
  {
    value: { type: Number, required: true, unique: true },
    agree: { type: String, default: false },
  },
  {
    timestamps: true,
  }
);

const Rating = mongoose.model("Rating", ratingSchema);
export default Rating;
