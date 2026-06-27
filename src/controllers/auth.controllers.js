// Things we have to do for this
// take some data
// validate data
// check DB if user already exists
// saved the new user (ACCESS TOKEN, REFRESH TOKEN, GENERAL TOKEN, SEND EMAIL)
// userverification => email
// send response back to the request

import { User } from "../models/user.models";
import { ApiResponse } from "../utils/api-respons.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

const registerUser = asyncHandler(async (req, res) => {
  // order doesn't matter
  const { email, username, password, role } = req.body;

  // check inn db if user exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists ", []);
  }
  //   What if we don't find a new user
  // Since these are db operation so use await
  const user = await User.create({
    email,
    password,
    username,
    isEmailVerified: false,
  });
  // Once we have user created this then i need to send email to user
  // Now user.model we have some methods like generateTemporaryToken
  // weare generating tokens to do things
  // any model which has userSchema can access it
  // we can't access via User cause this is a mongoose model
  const { unhashedToken, hashedTOken, tokenExpiry } =
    user.generateTemporaryToken();
});
