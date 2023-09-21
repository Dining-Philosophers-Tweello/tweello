import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';

// @desc    Authenticate (login) a user, set token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (request, response) => {
    response.status(200).json({ message: 'User authentication successful' });
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (request, response) => {
    const {name, email, password} = request.body;
    const userExists = await User.findOne({email});
    if (userExists) {
        response.status(400);
        throw new Error('This user is already registered');
      }

      const user = await User.create({name, email, password,});
});

export {authUser, registerUser};
