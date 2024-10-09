import { ApiError } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/genrateAccessToken.js";
import { User } from "../MODELS/userModel.js";

const authentication = asyncHandler(async (req, res, next) => {
  const tokenFromCookie = req.cookies.accessToken; // "accesstoken" is name of cookie that is from client side given by server when sending cookies

  const authHead = req.headers.authorization;

  let userId;
  if (tokenFromCookie) {
    userId = verifyToken(tokenFromCookie);
  } else if (authHead) {
    authHead.replace("Bearer ", "");
    // in case of mobile cookie come in authorization header bearer token
    userId = verifyToken(authHead);
  } else throw new ApiError(400, "Invalid request");

  const user = await User.findById({ _id: userId.userId });
  if (!user) throw new ApiError(400, "Invalid request user is not registered");
  req.user = user;
  next();
});

export { authentication };
