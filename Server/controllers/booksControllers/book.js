import Book from "../../models/book/index.js";
import createError from "http-errors";
import Bookshelf from "../../models/bookshelf/index.js";

//==========================================================================
// Create New book
//==========================================================================

export const createBook = async (req, res, next) => {
  const {
    title,
    author,
    coverImageUrl,
    language,
    summary,
    bookshelf: shelfId,
  } = req.body;

  // Validate required fields
  if (!title || !author || !shelfId) {
    return res
      .status(400)
      .json({ message: "Title, author, and bookshelf ID are required" });
  }

  try {
    // Create new book instance
    const newBook = new Book({
      title,
      author,
      coverImageUrl,
      language,
      summary,
      bookshelf: shelfId, // Ensure correct property name matches your schema
    });

    // console.log("New Book:", newBook); // Log the new book object for debugging

    // Save the new book
    const savedBook = await newBook.save();

    // Find the bookshelf by ID and add the new book to it
    const bookshelf = await Bookshelf.findById(shelfId);
    if (!bookshelf) {
      return res
        .status(404)
        .json({ success: false, message: "Bookshelf not found" });
    }

    bookshelf.books.push(savedBook._id); // Add the book ID to the bookshelf
    await bookshelf.save();

    res.status(201).json({
      success: true,
      message: "Book created and added to the bookshelf successfully",
      book: savedBook,
    });
  } catch (error) {
    console.error("Error creating book:", error); // Log the error for debugging
    return next(createError(500, "Server error! please try again!"));
  }
};

//==========================================================================
// Update book to add author/s
//==========================================================================
export const updateBook = async (req, res, next) => {
  const { bookId, firstName, lastName, birthDate, deathDate } = req.body;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return next(createError(400, "Book does not exist!"));
    }

    const author = {
      firstName,
      lastName,
      birthDate,
      deathDate,
    };

    book.authors.push(author);

    await book.save();

    return res.status(200).json({
      success: true,
      result: book,
      message: "Book author is successfully added.",
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Get all books
//==========================================================================
export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();

    // console.log("books =", books);

    if (!books) {
      return next(createError(400, "Books not found!"));
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
export const getBook = async (req, res, next) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId);

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
// Get single book
//==========================================================================
export const deleteBook = async (req, res, next) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId);

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
// Count all books
//==========================================================================

export const countBooks = async (req, res, next) => {
  try {
    const count = await Book.countDocuments();

    if (count === 0) {
      return next(createError(404, "No books found."));
    }

    return res.status(200).json({
      success: true,
      result: count,
    });
  } catch (error) {
    console.error("Error counting books:", error);
    return next(
      createError(500, "Failed to count books. Please try again later.")
    );
  }
};

//==========================================================================
// Update book rating
//==========================================================================

export const updateBookRating = async (req, res, next) => {
  const { bookId } = req.params;
  const { rating } = req.body;

  // Ensure rating is valid
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.ratings.push(rating);
    await book.save();

    const averageRating =
      book.ratings.reduce((acc, rating) => acc + rating, 0) /
      book.ratings.length;

    res.status(200).json({
      success: true,
      book,
      averageRating,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//==========================================================================
// Update book rating
//==========================================================================

export const getBookRating = async (req, res, next) => {
  const { bookId } = req.params;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const averageRating =
      book.ratings.length > 0
        ? book.ratings.reduce((acc, rating) => acc + rating, 0) /
          book.ratings.length
        : 0;

    res.status(200).json({
      success: true,
      averageRating,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
