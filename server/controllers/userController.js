import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc    Authenticate (login) a user, set token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (request, response) => {
  response.status(200).json({ message: "User authentication successful" });
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
    response.status(201).json({
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

export { authUser, deleteUser, registerUser };
