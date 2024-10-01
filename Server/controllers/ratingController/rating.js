import Rating from "../../models/ratings/index.js";
import createError from "http-errors";

//==========================================================================
// Create New rating
//==========================================================================
export const createRating = async (req, res, next) => {
  try {
    const newRating = new Rating(req.body);

    try {
      await newRating.save();
    } catch (error) {
      console.log(error);
      return next(createError(500, "Rating not saved"));
    }

    res.status(201).json({
      success: true,
      message: "Rating successfully created!",
    });
  } catch (error) {
    console.log(error);
    return next(createError(500, "Server error! please try again!"));
  }
};

//==========================================================================
// Get all ratings
//==========================================================================
export const getRatings = async (req, res, next) => {
  try {
    const ratings = await Rating.find();

    if (!ratings) {
      return next(createError(400, "Ratings not found!"));
    }

    return res.status(200).json({
      success: true,
      result: ratings,
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Get single rating
//==========================================================================
export const getRating = async (req, res, next) => {
  const ratingId = req.params.id;

  try {
    const rating = await Rating.findById(ratingId);

    if (!rating) {
      return next(createError(400, "Rating does not exist!"));
    }

    return res.status(200).json({
      success: true,
      result: rating,
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Delete single rating
//==========================================================================
export const deleteRating = async (req, res, next) => {
  const ratingId = req.params.id;

  try {
    const rating = await Rating.findById(ratingId);

    if (!rating) {
      return next(createError(404, "Rating does not exist!"));
    }

    await Rating.findByIdAndDelete(ratingId);

    return res.status(200).json({
      success: true,
      message: "Rating has been successfully deleted",
    });
  } catch (error) {
    return next(createError(500, "Server error! Please try again!"));
  }
};
