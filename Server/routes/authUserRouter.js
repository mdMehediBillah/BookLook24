import express from "express";
import {
  changePassword,
  createUser,
  loginUser,
  updateUser,
  userLogout,
  refreshUser,
} from "../controllers/authUserController/auth.js";
import { isAuthenticated } from "../middlewares/auth/index.js";

// Auth User Router
const authUserRouter = express.Router();

// User Routes
authUserRouter.post("/register", createUser);
authUserRouter.post("/login", loginUser);
authUserRouter.post("/refresh", isAuthenticated, refreshUser);
authUserRouter.put("/update/:userId", updateUser);
authUserRouter.get("/logout", userLogout);
authUserRouter.put("/change-password/:id", changePassword);

// Export Auth User Router
export default authUserRouter;
