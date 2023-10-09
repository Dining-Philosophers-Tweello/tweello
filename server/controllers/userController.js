import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Authenticate (login) a user, set token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(response, user._id);
    response.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    response.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (request, response) => {
  response.cookie("jwt", "", {
    httoPnly: true,
    expires: new Date(0),
  });

  response.status(200).json({ message: "User logged out" });
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (request, response) => {
  const { name, email, password } = request.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    response.status(400);
    throw new Error("This user is already registered");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    generateToken(response, user._id);
    response.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    response.status(400);
    throw new Error("Invalid request");
  }

  response.status(200).json({ message: "Success" });
});

// @desc    Delete a user
// @route   DELETE /api/users/profile
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  // Check if the user exists
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Delete the user
  await User.deleteOne({ _id: req.user._id });

  res.status(200).json({ message: "User deleted" });
});

// @desc    Edit an existing user's information
// @route   PUT /api/users/profile
// @access  Private
const editUserProfile = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user._id);

  if (user) {
    user.name = request.body.name || user.name;
    user.password = request.body.password || user.password;

    const updatedUser = await user.save();

    response.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    response.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (request, response) => {
  //response.status(200).json({ message: "User Profile" });
    const user = await User.findById(request.user._id);
  
    if (user) {
      response.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      response.status(404);
      throw new Error('User not found');
    }
  });

export {
  authUser,
  deleteUser,
  editUserProfile,
  getUserProfile,
  logoutUser,
  registerUser,
};

