import asyncHandler from "express-async-handler";

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
  response.status(200).json({ message: "User registration successful" });
});

export { authUser, registerUser };
