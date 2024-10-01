import Genre from "../../models/genre/index.js";
import createError from "http-errors";

//==========================================================================
// Create New genre
//==========================================================================
export const createGenre = async (req, res, next) => {
  const { category } = req.body;
  try {
    const genre = await Genre.findOne({ category: category });

    if (genre) {
      return next(createError(400, "Genre already exist!"));
    }

    const newGenre = new Genre(req.body);

    try {
      await newGenre.save();
    } catch (error) {
      console.log(error);
      return next(createError(500, "Genre not saved"));
    }

    res.status(201).json({
      success: true,
      message: "Genre successfully created!",
    });
  } catch (error) {
    console.log(error);
    return next(createError(500, "Server error! please try again!"));
  }
};

//==========================================================================
// Get all genre
//==========================================================================
export const getGenres = async (req, res, next) => {
  const { category } = req.params;
  try {
    let genres;

    if (category) {
      genres = await Genre.find({ category });
      if (!genres || genres.length === 0) {
        return next(
          createError(404, "Genres not found for the given category!")
        );
      }
    } else {
      genres = await Genre.find();

      if (!genres || genres.length === 0) {
        return next(createError(400, "Genres not found!"));
      }
    }

    return res.status(200).json({
      success: true,
      result: genres,
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Get single Genre
//==========================================================================
export const getGenre = async (req, res, next) => {
  const genreId = req.params.id;

  try {
    const genre = await Genre.findById(genreId);

    if (!genre) {
      return next(createError(400, "Genre does not exist!"));
    }

    return res.status(200).json({
      success: true,
      result: genre,
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Delete single genre
//==========================================================================
export const deleteGenre = async (req, res, next) => {
  const genreId = req.params.id;

  try {
    const genre = await Genre.findById(genreId);

    if (!genre) {
      return next(createError(404, "Genre does not exist!"));
    }

    await Genre.findByIdAndDelete(genreId);

    return res.status(200).json({
      success: true,
      message: "Genre has been successfully deleted",
    });
  } catch (error) {
    return next(createError(500, "Server error! Please try again!"));
  }
};
