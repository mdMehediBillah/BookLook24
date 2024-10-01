import Bookshelf from "../../models/bookshelf/index.js";
import createError from "http-errors";
import { v4 as uuidv4 } from "uuid";

//==========================================================================
// Create a bookshelf
//==========================================================================

export const createBookshelf = async (req, res, next) => {
  const {
    image,
    name,
    country,
    state,
    city,
    zipCode,
    street,
    longitude,
    latitude,
    openingTime,
    closingTime,
  } = req.body;

  try {
    // Generate a unique barcode
    const barcode = uuidv4();

    // Check if the bookshelf already exists
    const existingBookshelf = await Bookshelf.findOne({ barcode });

    if (existingBookshelf) {
      return next(createError(400, "Bookshelf already exists!"));
    }

    const newBookshelf = {
      barcode,
      image,
      name,
      country,
      state,
      city,
      zipCode,
      street,
      longitude,
      latitude,
      openingTime,
      closingTime,
    };
    // console.log(newBookshelf);

    await Bookshelf.create(newBookshelf);
    // Create a new bookshelf instance
    // const newBookshelf = new Bookshelf({
    //   barcode,
    //   image,
    //   name,
    //   country,
    //   state,
    //   city,
    //   postcode,
    //   road,
    //   longitude,
    //   latitude,
    //   openingTime,
    //   closingTime,
    // });
    // Save the new bookshelf to the database
    // await newBookshelf.save();

    // Respond with success message
    res.status(201).json({
      success: true,
      message: "Bookshelf successfully created!",
    });
  } catch (error) {
    console.error(error);
    return next(createError(500, "Server error! Please try again!"));
  }
};

//==========================================================================
// Update bookshelf
//==========================================================================
export const updateBookshelf = async (req, res, next) => {
  const { id } = req.params;
  const {
    image,
    name,
    country,
    state,
    city,
    zipCode,
    street,
    longitude,
    latitude,
    openingTime,
    closingTime,
  } = req.body;

  try {
    // Find and update the bookshelf by ID
    const updatedBookshelf = await Bookshelf.findByIdAndUpdate(
      id,
      {
        $set: {
          image,
          name,
          country,
          state,
          city,
          zipCode,
          street,
          longitude,
          latitude,
          openingTime,
          closingTime,
        },
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure validators are run on the update
      }
    );

    if (!updatedBookshelf) {
      return next(createError(404, "Bookshelf not found!"));
    }

    // Respond with success message and updated document
    res.status(200).json({
      success: true,
      message: "Bookshelf successfully updated!",
      data: updatedBookshelf,
    });
  } catch (error) {
    console.error(error);
    return next(createError(500, "Server error! Please try again!"));
  }
};

//==========================================================================
// Get all bookshelves
//==========================================================================
export const getBookshelves = async (req, res, next) => {
  try {
    const { search, page } = req.query;

    if (page && page) {
      const bookshelves = await Bookshelf.find()
        .limit(12)
        .skip((page - 1) * 12);

      if (!bookshelves) {
        return next(createError(400, "Bookshelves not found!"));
      }
      // console.log(bookshelves.length);
      return res.status(200).json({
        success: true,
        result: bookshelves,
      });
    }
    // const { search, page } = req.query;
    let query = {};
    if (search) {
      // If search parameter is provided, construct the query with $or conditions
      query = {
        $or: [
          { name: new RegExp(search, "i") },
          { country: new RegExp(search, "i") },
          { state: new RegExp(search, "i") },
          { city: new RegExp(search, "i") },
        ],
      };
    }
    // Find bookshelves based on the constructed query or return all if no query
    const bookshelves = await Bookshelf.find(query);
    if (!bookshelves || bookshelves.length === 0) {
      return next(createError(400, "Bookshelves not found!"));
    }
    return res.status(200).json({
      success: true,
      result: bookshelves,
    });
  } catch (error) {
    return next(createError(500, "Server error! Please try again!"));
  }
};

// export const getBookshelves = async (req, res, next) => {
//   try {
//     const bookshelves = await Bookshelf.find();

//     if (!bookshelves) {
//       return next(createError(400, "Bookshelves not found!"));
//     }

//     return res.status(200).json({
//       success: true,
//       result: bookshelves,
//     });
//   } catch (error) {
//     return next(createError(400, "Server error! Please try again!"));
//   }
// };

//==========================================================================
// Get single bookshelf
//==========================================================================
export const getBookshelf = async (req, res, next) => {
  const bookshelfId = req.params.id;

  try {
    const bookshelf = await Bookshelf.findById(bookshelfId);

    if (!bookshelf) {
      return next(createError(400, "Bookshelf does not exist!"));
    }

    return res.status(200).json({
      success: true,
      result: bookshelf,
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Get single bookshelf
//==========================================================================
export const deleteBookshelf = async (req, res, next) => {
  const { id: bookshelfId } = req.params;

  try {
    const bookshelf = await Bookshelf.findById(bookshelfId);

    if (!bookshelf) {
      return next(createError(404, "Bookshelf not found"));
    }

    await Bookshelf.findByIdAndDelete(bookshelfId);

    return res.status(200).json({
      success: true,
      message: "Bookshelf has been successfully deleted",
    });
  } catch (error) {
    return next(createError(500, "Internal server error"));
  }
};

//==========================================================================
// Get single bookshelf books
//==========================================================================
export const getAllBooksInBookshelf = async (req, res, next) => {
  const bookshelfId = req.params.id;

  try {
    const bookshelf = await Bookshelf.findById(bookshelfId)
      .populate({ path: "books", model: "Book" })
      .populate({ path: "borrowedBooks", model: "Book" });

    if (!bookshelf) {
      return next(createError(400, "Bookshelf not found!"));
    }

    const { books, donatedBooks, borrowedBooks } = bookshelf;

    res.status(200).json({
      success: true,
      books,
      donatedBooks,
      borrowedBooks,
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Total Number of bookshelves
//==========================================================================

export const countBookshelves = async (req, res, next) => {
  try {
    const bookshelvesCount = await Bookshelf.countDocuments();

    res.status(200).json({
      success: true,
      result: bookshelvesCount,
    });
  } catch (error) {
    next(createError(400, "Server error! Please try again!"));
  }
};
