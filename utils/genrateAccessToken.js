import jwt from "jsonwebtoken";

function createAccessToken(userId) {
  return jwt.sign(
    {
      userId: userId,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.EXPIRE_IN,
    }
  );
}

function verifyToken(token) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

export { createAccessToken, verifyToken };
