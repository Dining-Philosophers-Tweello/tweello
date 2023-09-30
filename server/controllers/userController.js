import asyncHandler from "express-async-handler";
import generateToken from '../utils/generateToken.js';
import User from "../models/userModel.js";

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

export { authUser, registerUser };
