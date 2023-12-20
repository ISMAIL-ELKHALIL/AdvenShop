// Import necessary libraries and modules
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
      // Verify the JWT using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user details from the database based on the decoded user ID
      req.user = await User.findById(decoded.userId).select("-password");

      // Move to the next middleware in the stack
      next();
    } catch (error) {
      // Handle token verification errors
      res.status(404);
      throw new Error("Not authorized, token failed!");
    }
  } else {
    // Handle the case where no token is present in the request
    res.status(404);
    throw new Error("Not authorized, no token");
  }
});

// Admin Middleware
const admin = (req, res, next) => {
  // Check if the user is an admin
  if (req.user && req.user.isAdmin) {
    // Move to the next middleware in the stack if the user is an admin
    next();
  } else {
    // Handle the case where the user is not an admin
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};

// Export the middleware functions for use in other parts of the application
export { protect, admin };
