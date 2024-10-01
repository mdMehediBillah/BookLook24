import User from "../../models/user/index.js";
import createError from "http-errors";
import bcrypt from "bcryptjs";
import generateToken from "../../middlewares/token/index.js";

//==========================================================================
// Register new user
//==========================================================================
export const createUser = async (req, res, next) => {
  const { firstName, lastName, email, password, agree } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "Email has been taken. Please try another one!" });
      // return next(
      //   createError(400, "Email has been taken. Please try another one!")
      // );
    }

    if (!user) {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        agree,
      });

      // Save user in the database
      try {
        await newUser.save();
      } catch (error) {
        console.log(error);
        return next(createError(500, "User could not be saved"));
      }

      // Generate token for a user
      const token = generateToken(newUser);

      res
        .cookie("token", token, {
          path: "/",
          httpOnly: false,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          sameSite: "strict",
          secure: true,
        })
        .status(201)
        .json({
          success: true,
          message: "Account successfully created!",
        });
    }
  } catch (error) {
    console.log(error);
    return next(createError(500, "Server error! please try again!"));
  }
};

//==========================================================================
// Login user
//==========================================================================
export const loginUser = async (req, res, next) => {
  const { email, password, rememberMe } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "You provide an invalid email!" });
      // return next(createError(400, "Wrong credentials"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "You provide an invalid password!" });
      // return next(createError(400, "Incorrect password!"));
    }

    if (user && isPasswordValid) {
      const {
        password,
        bookshelfManager,
        financeManager,
        generalManager,
        ...rest
      } = user._doc;

      const token = generateToken(user);

      const tokenExpiry = rememberMe
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 24 * 60 * 60 * 1000);

      res
        // .cookie("token", token, {
        //   path: "/",
        //   httpOnly: false,
        //   expires: tokenExpiry,
        //   sameSite: "strict",
        //   secure: true,
        // })

        .status(200)
        .json({
          success: true,
          result: { ...rest },
          message: "User successfully logged in!",
          token,
        });
    }
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// refresh user
//==========================================================================
export const refreshUser = async (req, res, next) => {
  const { user } = req;
  try {
    const dataUser = await User.findById(user?.id);
    if (!dataUser) {
      // return res.status(401).json({ message: " invalid token!" });
      return next(createError(401, "Wrong credentials"));
    }

    if (dataUser) {
      const {
        password,
        bookshelfManager,
        financeManager,
        generalManager,
        ...rest
      } = dataUser._doc;

      res.status(200).json({
        success: true,
        result: { ...rest },
        message: "User successfully logged in!",
      });
    }
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Update user account
//==========================================================================
export const updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const { email, password, ...updateData } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(createError(404, "User does not exist!"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createError(400, "Incorrect password!"));
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    try {
      await updatedUser.save();
    } catch (error) {
      return next(createError(500, "Update could not be saved!"));
    }

    return res.status(200).json({
      success: true,
      result: updatedUser,
      message: "Account successfully updated!",
    });
  } catch (error) {
    return next(createError(500, "Server error! Please try again!"));
  }
};

//==========================================================================
// User logout
//==========================================================================

export const userLogout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(createError(500, "Server error!"));
  }
};

//==========================================================================
// Change password
//==========================================================================
export const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(createError(404, "User not found! Please login!"));
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return next(createError(400, "Invalid old password! Please try again!"));
    }

    user.password = newPassword;

    try {
      await user.save();
    } catch (error) {
      return next(
        createError(500, "New password could not be saved! Please try again!")
      );
    }

    return res.status(200).json({
      success: true,
      result: user,
      message: "Password is successfully updated!",
    });
  } catch (error) {
    return next(createError(500, "Server error! Please try again!"));
  }
};
