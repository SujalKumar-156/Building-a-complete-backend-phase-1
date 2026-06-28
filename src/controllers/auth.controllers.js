// Things we have to do for this
// take some data
// validate data
// check DB if user already exists
// saved the new user (ACCESS TOKEN, REFRESH TOKEN, GENERAL TOKEN, SEND EMAIL)
// userverification => email
// send response back to the request

import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-respons.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    // This is to assign it in DB but currrently it is not saved in db
    user.refreshToken = refreshToken;
    // now to save the data
    //   currently it runs throught all the validations but i want only this one so fix that we will pass an object validate before save

    await user.save({
      validateBeforeSave: false /* this method is nicely design not only just generate also saves the refreshtoken in the db*/,
    });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong generating access token", []);
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // order doesn't matter
  const { fullName, email, username, password, role } = req.body;

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
    fullName,
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
  const {
    unhashedToken,
    hashedTOken: hashedToken,
    tokenExpiry,
  } = user.generateTemporaryToken();
  // we have checked user being created and hash tokens are generated
  // We have to store hunahshed tokens cause the email verification token and email expiry still empty
  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;
  // Now we should save the user
  await user.save({ validateBeforeSave: false });
  // Now on server side is done now i need to send an email so that same token can be sent to user itself that's the final part
  await sendEmail({
    email: user?.email,
    subject: "Please verify your email",
    mailgenContent: emailVerificationMailgenContent(
      user.username,
      //   For link it would be different in the cases of being deployed on vercel and localhost
      //   Generating dynamic link
      `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unhashedToken}`,
    ),
  });
  // We don't need to send whole amount of data
  const createdUser = await User.findById(user._id).select(
    // takes string
    // means remove password removes refreshToken
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
  );
  if (!createdUser) {
    throw new ApiError(
      500,
      "Something went wrong while registering the user",
      [],
    );
  }
  // Now we can send the response to user
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { user: createdUser },
        "User registered successfully and verification email has been sent on you email",
      ),
    );
});

export { registerUser };
