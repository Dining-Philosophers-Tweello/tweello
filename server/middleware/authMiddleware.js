import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = asyncHandler(async (request, response, next) => {
  let token;
  token = request.headers.authorization.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      request.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      response.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    response.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
