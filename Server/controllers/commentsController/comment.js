import createError from "http-errors";
import User from "../../models/user/index.js";
import Comment from "../../models/comment/index.js";

//==========================================================================
// Create New Comment
//==========================================================================
export const createComment = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(createError(400, "User not found!"));
    }

    const comment = new Comment(req.body);

    // Save comment in the database
    try {
      await comment.save();
    } catch (error) {
      console.log(error);
      return next(createError(500, "Something went wrong!"));
    }

    user.comments.push(comment._id);

    try {
      await user.save();
    } catch (error) {
      console.log(error);
      return next(createError(500, "Something went wrong!"));
    }

    res.status(201).json({
      success: true,
      message: "Comment has been successfully sent",
    });
  } catch (error) {
    return next(createError(500, "Comment could not be saved"));
  }
};

//==========================================================================
// Get all Comments
//==========================================================================export const getAllComments = async (req, res, next) => {
export const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find();

    if (!comments) {
      return next(createError(404, "Comments not found"));
    }

    return res.status(200).json({ success: true, result: comments });
  } catch (error) {
    console.log(error);
    return next(
      createError(400, "The comments could not be accessed! Please try again")
    );
  }
};

//==========================================================================
// Get Comment
//==========================================================================
export const getComment = async (req, res, next) => {
  const commentId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ message: "Invalid comment ID" });
  }

  // Authorization check
  if (req.user.role !== "generalManager") {
    return res
      .status(403)
      .json({ message: "Forbidden: to perform such action" });
  }

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return next(createError(400, "Comment not found!"));
    }

    return res.status(200).json({
      success: true,
      result: comment,
    });
  } catch (error) {
    console.log(error);
    return next(createError(500, "Something went wrong!"));
  }
};

//==========================================================================
// Delete single comment
//==========================================================================
export const deleteComment = async (req, res) => {
  const commentId = req.params.commentId;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ message: "Invalid comment ID" });
  }

  if (req.user.role !== "priest") {
    return res.status(403).json({ message: "Forbidden: to delete comment" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const comment = await Comment.findByIdAndDelete(commentId).session(session);

    if (!comment) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Comment not found" });
    }

    const user = await User.findOneAndUpdate(
      { "comments._id": commentId },
      { $pull: { comments: { _id: commentId } } },
      { new: true, session }
    );

    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "User not found" });
    }

    await session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({ message: "Internal server error" });
  }
};

//==========================================================================
// Get all comments count
//==========================================================================
export const countComments = async (req, res, next) => {
  try {
    const counts = await Comment.countDocuments();
    return res.status(200).json(counts);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
