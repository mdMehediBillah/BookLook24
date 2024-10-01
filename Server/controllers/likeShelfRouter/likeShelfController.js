import createError from "http-errors";
import User from "../../models/user/index.js";
import Bookshelf from "../../models/bookshelf/index.js";
// Create a subscription
export const likeShelfController = async (req, res, next) => {
  const { userId, bookshelfId } = req.body;

  if (!userId || !bookshelfId) {
    return res
      .status(400)
      .json({ message: "User ID and bookshelf ID are required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.likedBookshelves.includes(bookshelfId)) {
      user.likedBookshelves.push(bookshelfId);
      await user.save();
    }

    res.status(200).json({ message: "Bookshelf liked successfully" });
  } catch (error) {
    console.error("Error liking bookshelf:", error);
    return next(createError(500, "Server error! please try again!"));
  }
};

// Get all liked bookshelves
export const getAllLikedShelves = async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await User.findById(userId).populate("likedBookshelves");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { likedBookshelves } = user;
    const favBookshelves = await Bookshelf.find({
      _id: { $in: likedBookshelves },
    });

    res.status(200).json({ favBookshelves });
  } catch (error) {
    console.error("Error fetching liked bookshelves:", error);
    next(createError(500, "Server error! Please try again!"));
  }
};

// check status of liked bookshelf
export const checkLikedStatus = async (req, res) => {
  const { userId, bookshelfId } = req.query;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const liked = user.likedBookshelves.includes(bookshelfId);
    res.status(200).json({ liked });
  } catch (error) {
    res.status(500).json({ message: "Failed to check liked status" });
  }
};
