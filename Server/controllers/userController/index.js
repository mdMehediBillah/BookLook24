import createError from "http-errors";
import User from "../../models/user/index.js";
import mongoose from "mongoose";

//====================================================================
// Get all users
//====================================================================
export const getUsers = async (req, res, next) => {
    try {
      const users = await User.find();
  
      if (!users.length) {
        return next(createError(404, "No users found!"));
      }
  
      return res.status(200).json({
        success: true,
        users: users,
      });
    } catch (error) {
      return next(createError(500, "Server error! Please try again!"));
    }
  };

  
//====================================================================
// Get users by name
//====================================================================

export const getUserByName = async (req, res, next) => {
    try {
      const search = req.query.search || "";
      const limit = parseInt(req.query.limit, 10) || 20;
      //http://bookshelf.com/api/v1/users?search=habte&limit=10
  
      const query = {
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
        ],
      };
  
      /**
       *The lean():
       is method in Mongoose is used to retrieve plain JavaScript objects from a query instead of Mongoose documents. When you use lean(), Mongoose skips the conversion of documents into Mongoose objects, making the query faster and more lightweight. This can be especially useful when you don't need the additional methods and properties that come with Mongoose documents.
       */
  
      const users = await User.find(query)
        .limit(limit)
        .select("firstName lastName")
        .lean();
  
      if (!users) {
        return res.status(404).json({ message: "Users not found" });
      }
  
      return res.status(200).json({ success: true, result: users });
    } catch (error) {
      return next(createError(500, "Server error! Please try again!"));
    }
  };
  

//====================================================================
// Get single user
//====================================================================
export const getUser = async (req, res, next) => {
  const userId = req.params.id;

  // Validate the user ID
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(createError(404, "User not found! Please login!"));
    }

    return res.status(200).json({
      success: true,
      result: user,
    });
  } catch (error) {
    return next(createError(500, "Server error! Please try again!"));
  }
};



//====================================================================
// Delete single user
//====================================================================
export const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  // Validate the user ID
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  // Authorization check
  if (req.user.role !== "generalManager") {
    return res.status(403).json({ message: "Forbidden: Unauthorized action" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(createError(404, "User not found! Please login!"));
    }

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "Successfully deleted",
      result: user,
    });
  } catch (error) {
    return next(createError(500, "Server error! Please try again!"));
  }
};

//====================================================================
// Total users count
//====================================================================
export const getTotalUsersCount = async (req, res, next) => {
  try {
    const totalCount = await User.countDocuments();

    return res.status(200).json({
      success: true,
      result: totalCount,
    });
  } catch (error) {
    return next(createError(500, "Server error! Please try again!"));
  }
};
