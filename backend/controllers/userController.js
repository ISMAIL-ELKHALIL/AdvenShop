import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
//!@desc Login user / get Token
//?@route POST /api/users/login
//?@access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//!@desc Register  a new user
//?@route POST /api/users/
//?@access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    console.log("userExists : ", userExists);
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    //! After creating user successfully generate a JWt token
    generateToken(res, user);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email password");
  }
});

//!@desc Logout user / clear cookies ( the JWT stored in http Only Cookie on the server )
//?@route POST /api/users/logout
//?@access Private (must be login)

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, maxAge: 0 });
  res.status(200).json({ status: 200, message: "Logged out successfully" });
});

//!@desc Get user Profile
//?@route GET /api/users/profile
//?@access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//!@desc Update user profile (its own Profile)
//?@route PUT /api/users/profile   (no id here JWT will be used)
//?@access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    //! password is hash so we can't change it only if user wants to change it
    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      status: 200,
      message: "User profile updated successfully",
      data: updatedUser,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//!@desc Get All users
//?@route GET /api/users/
//?@access Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  res.send("Get All users");
});

//!@desc Get user By ID
//?@route GET /api/users/:id
//?@access Private/Admin

const getUserByID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  res.send(`Get user by ${id}`);
});

//!@desc Delete user
//?@route DELETE /api/users/:id
//?@access Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  res.send(`Delete user by ${id}`);
});

//!@desc Update user
//?@route PUT /api/users/:id
//?@access Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  res.send(`Update  user by ${id}`);
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserByID,
  updateUser,
  deleteUser,
};
