import createError from "http-errors";
import User from "../../models/user/index.js";
import BorrowedBook from "../../models/borrowedBook/index.js";
import Bookshelf from "../../models/bookshelf/index.js";
import Book from "../../models/book/index.js";

//==========================================================================
// Create New Borrowed book
//==========================================================================

export const createBorrowedBook = async (req, res) => {
  const { book, user, borrowedFrom } = req.body;

  try {
    // Find the bookshelf by the borrowedFrom ID
    const bookshelf = await Bookshelf.findById(borrowedFrom);
    if (!bookshelf) {
      return res.status(404).json({ message: "Bookshelf not found" });
    }

    // Check if the book ID exists in the books array
    const bookIndex = bookshelf.books.indexOf(book);
    if (bookIndex === -1) {
      return res
        .status(404)
        .json({ message: "Book not found in the bookshelf" });
    }

    // Remove the book from the books array
    bookshelf.books.splice(bookIndex, 1);

    // Add the book to the borrowedBooks array with user information
    bookshelf.borrowedBooks.push({ _id: book, user });

    // Save the updated bookshelf document
    await bookshelf.save();
    // console.log(bookshelf);
    return res
      .status(200)
      .json({ message: "Book successfully borrowed", bookshelf });
  } catch (error) {
    console.error("Error borrowing book: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//==========================================================================
// Get all books
//==========================================================================
export const getBorrowedBooks = async (req, res, next) => {
  try {
    const books = await BorrowedBook.find();

    if (!books) {
      return next(createError(400, "Borrowed books not found!"));
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
// Get single book
//==========================================================================
export const getBorrowedBook = async (req, res, next) => {
  const borrowedBookId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(borrowedBookId)) {
    return res.status(400).json({ message: "Invalid borrowed book ID" });
  }

  if (req.user.role !== "generalManager") {
    return res
      .status(403)
      .json({ message: "Forbidden: to perform such action" });
  }

  try {
    const book = await BorrowedBook.findById(borrowedBookId);

    if (!book) {
      return next(createError(400, "Book does not exist!"));
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
// Delete a borrowed book
//==========================================================================
export const deleteBorrowedBook = async (req, res) => {
  const bookId = req.params.bookId;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid borrowed book ID" });
  }

  if (req.user.role !== "generalManager") {
    return res
      .status(403)
      .json({ message: "Forbidden: to delete borrowed book" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const book = await BorrowedBook.findByIdAndDelete(bookId).session(session);

    if (!book) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Borrowed book not found" });
    }

    // Update user

    const user = await User.findOneAndUpdate(
      { "borrowedBooks._id": bookId },
      { $pull: { borrowedBooks: { _id: bookId } } },
      { new: true, session }
    );

    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "User not found" });
    }

    // Update bookshelf

    const bookshelf = await Bookshelf.findOneAndUpdate(
      { "borrowedBooks._id": bookId },
      { $pull: { borrowedBooks: { _id: bookId } } },
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
      .json({ success: true, message: "Borrowed deleted successfully" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({ message: "Internal server error" });
  }
};

//==========================================================================
// Get counts of borrowed books
//==========================================================================
export const countBorrowedBooks = async (req, res, next) => {
  try {
    const counts = await BorrowedBook.countDocuments();

    if (counts === 0) {
      return next(createError(404, "No borrowed books found"));
    }

    return res.status(200).json({
      success: true,
      result: counts,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
