import jwt from "jsonwebtoken";

const generateToken = (response, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  response.cookie("jwt", token, {
    httpOnly: true,
    secure: process.send.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateToken;
