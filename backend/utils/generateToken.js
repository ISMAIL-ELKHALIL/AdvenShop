import jwt from "jsonwebtoken";
import { daysToMilliSeconds } from "./daysToMilliSeconds.js";
/**
 * Generates a JSON Web Token (JWT) and sets it as an HTTP-Only cookie in the response.
 * @param {Object} res - The Express response object.
 * @param {Object} user - The user object for whom the token is generated.
 */
const generateToken = async (res, user) => {
  // Generate a JWT with the user's ID, signed with the JWT secret, and set to expire in 30 days
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set the JWT as an HTTP-Only Cookie in the response
  res.cookie("jwt", token, {
    httpOnly: true, //?the cookie is only accessible to the server (avoid xss)
    secure: process.NODE_ENV !== "development", // Use secure (https) on production environment
    sameSite: "strict", //?The cookie is sent only in a first-party context (i.e., the same site as the one the user is visiting)(avoid CSRF).
    maxAge: daysToMilliSeconds(30), // Set the cookie's maximum age to 30 days
  });
};

// Export the generateToken function
export default generateToken;

//! for me info about the HTTPOnly cookie : https://www.cookiepro.com/knowledge/httponly-cookie/
