import createError from "http-errors";
import DonatedBook from "../../models/donatedBook/index.js";
import Bookshelf from "../../models/bookshelf/index.js";
import User from "../../models/user/index.js";

//==========================================================================
// Create New Borrowed book
//==========================================================================
export const createDonatedBook = async (req, res, next) => {
  const { userId, bookshelfId, ...donatedBookData } = req.body;

  if (!title || !author || !ISBN || !userId || !bookshelfId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const bookshelf = await Bookshelf.findById(bookshelfId);
    if (!bookshelf) {
      return res.status(400).json({ message: "Bookshelf not found" });
    }

    const book = await DonatedBook.findOne({ ISBN });

    if (book) {
      return next(createError(400, "Book already donated!"));
    }

    const newDonatedBook = new DonatedBook(donatedBookData);

    try {
      await newDonatedBook.save();
    } catch (error) {
      return next(createError(500, "Donated book not saved!"));
    }

    await User.findByIdAndUpdate(
      userId,
      { $push: { donatedBooks: newDonatedBook._id } },
      { new: true, runValidators: true }
    );

    await Bookshelf.findByIdAndUpdate(
      bookshelfId,
      { $push: { donatedBooks: newDonatedBook._id } },
      { new: true, runValidators: true }
    );

    res.status(201).json({
      success: true,
      message: "Donated book created successfully",
      donatedBook: newDonatedBook,
    });
  } catch (error) {
    return next(createError(500, "Server error! please try again!"));
  }
};

//==========================================================================
// Get all donated books
//==========================================================================
export const getDonatedBooks = async (req, res, next) => {
  try {
    const books = await DonatedBook.find();

    if (!books) {
      return next(createError(400, "Donated books not found!"));
    }

    return res.status(200).json({
      success: true,
      result: books,
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Get single donated book
//==========================================================================
export const getDonatedBook = async (req, res, next) => {
  const donatedBookId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(donatedBookId)) {
    return res.status(400).json({ message: "Invalid donated book ID" });
  }

  try {
    const book = await DonatedBook.findById(donatedBookId);

    if (!book) {
      return next(createError(400, "Donated Book does not exist!"));
    }

    return res.status(200).json({
      success: true,
      result: book,
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Delete a donated book
//==========================================================================
export const deleteDonatedBook = async (req, res) => {
  const bookId = req.params.bookId;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid donated book ID" });
  }

  if (req.user.role !== "generalManager") {
    return res
      .status(403)
      .json({ message: "Forbidden: to delete donated book" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const book = await DonatedBook.findByIdAndDelete(bookId).session(session);

    if (!book) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Donated book not found" });
    }

    const user = await User.findOneAndUpdate(
      { "donatedBooks._id": bookId },
      { $pull: { donatedBooks: { _id: bookId } } },
      { new: true, session }
    );

    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "User not found" });
    }

    const bookshelf = await Bookshelf.findOneAndUpdate(
      { "donatedBooks._id": bookId },
      { $pull: { donatedBooks: { _id: bookId } } },
      { new: true, session }
    );

    if (!bookshelf) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Bookshelf not found" });
    }

    await session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .json({ success: true, message: "Donated book deleted successfully" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({ message: "Internal server error" });
  }
};

//==========================================================================
// Get counts of donated books
//==========================================================================
export const countDonatedBooks = async (req, res, next) => {
  try {
    const counts = await DonatedBook.countDocuments();

    if (counts === 0) {
      return next(createError(404, "No donated books found"));
    }

    return res.status(200).json({
      success: true,
      result: counts,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
