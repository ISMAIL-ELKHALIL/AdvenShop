import { Router } from "express";
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
  resetUserPassword,
  getCustomerCountByDay,
  getUserCountByDay,
} from "../controllers/userController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";
import { rateLimit } from "express-rate-limit";
const router = Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
  message: "Too many requests, please try again after 15 min",
});

router.get("/count-customer-by-day", protect, admin, getCustomerCountByDay);

router.get("/count-user-by-day", protect, admin, getUserCountByDay);

router.route("/register").post(registerUser);

router.route("/").get(getUsers);

router.post("/login", loginUser);

router.post("/logout", protect, logoutUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id([0-9a-fA-F]{24})")
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser)
  .get(protect, admin, getUserByID);

router.route("/rest-password").put(limiter, resetUserPassword);

export default router;
