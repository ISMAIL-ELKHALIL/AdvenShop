import jwt from "jsonwebtoken";
import { daysToMilliSeconds } from "./daysToMilliSeconds.js";

const generateToken = async (res, user) => {
  const token = jwt.sign({ userId:user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  //? Set JWT as HTTP-Only Cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.NODE_ENV !== "development", // https on production env
    sameSite: "strict",
    maxAge: daysToMilliSeconds(30), //30 day
  });   
};

export default generateToken;
