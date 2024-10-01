import mongoose from "mongoose";

const { Schema } = mongoose;

// User Schema
const genreSchema = new Schema(
  {
    category: { type: String, required: true, unique: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

// User Model
const Genre = mongoose.model("Genre", genreSchema);

// Export User Model
export default Genre;
