import { Router } from "express";
const router = Router();
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserByID,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";
router.route("/register").post(registerUser).get(getUsers);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser)
  .get(protect, admin, getUserByID);

export default router;
