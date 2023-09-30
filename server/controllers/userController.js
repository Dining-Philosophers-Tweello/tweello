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
// @route   DELETE /api/users/:id
// @access  Public
const deleteUser = asyncHandler(async (req, res) => {
  // Check if the user exists
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Delete the user
  await User.deleteOne({ _id: req.params.id });

  res.status(200).json({ message: "User deleted" });
});

// @desc    Edit an existing user's information
// @route   PUT /api/users/id
// @access  Public
//TODO: Make function private once auth middleware is set up
const editUserProfile = asyncHandler(async (request, response) => {
  //TODO:  Once authentication middleware is set up, change request.params.id below to request.user._id
  const user = await User.findById(request.params.id);

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

export { authUser, registerUser, editUserProfile };

export { authUser, deleteUser, registerUser };
