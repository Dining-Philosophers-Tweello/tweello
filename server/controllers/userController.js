// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = async (request, response) => {
    response.status(200).json({message: 'Auth User'})
}

export {authUser};