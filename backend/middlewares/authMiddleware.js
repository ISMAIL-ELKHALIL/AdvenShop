import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// Protect Routes (must be logged-in)
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from HTTP-ONLY Cookie
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(404);
      throw new Error("Not authorized,token failed!");
    }
  } else {
    res.status(404);
    throw new Error("Not authorized,no token");
  }
});

// Admin Middleware

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};

export { protect, admin };
