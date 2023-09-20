import asyncHandler from 'express-async-handler'

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (request, response) => {
    response.status(200).json({message: 'User registration successful'});
});

export {registerUser};
