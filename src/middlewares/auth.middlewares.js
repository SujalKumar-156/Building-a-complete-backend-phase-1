// HTTP requests are completely stateless.The server forgets who the user is after every request.Passing the token manually to every database query is inefficient

// Why We Intercept and InjectSingle Source of Truth: You decode the token exactly once in the middleware, rather than repeating decoding logic in every single route handler.Route Protection: If the token is missing or invalid, the middleware blocks the request immediately before it hits your database.Data Availability: Once attached to req.user, down-stream routes instantly know who is making the request (e.g., req.user._id).Cleaner Controller Code: Your controller functions stay clean and focus only on business logic.

// When we were generating the accessToken we had _id , meail and username via it

// int (req,res) =>{} as they pass on since req is an object it contains many information

// First, we want to intercept the req in the middleware
// I want to access the accessToken then decode the information out
// Then inject this information in req

// [Client Request with Token]
//          │
//          ▼
// [Auth Middleware] ────► 1. Verifies & decodes token
//          │              2. Extracts _id, email, username
//          │              3. Attaches them to req.user
//          ▼
// [Route Controller] ───► Uses req.user._id to fetch specific data
//          │
//          ▼
// [Client Response]

import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import jwt from "jsonwebtoken";

// res in not generally used in middleware but if we need we can just grab it

//  since middleware req, res,next
export const verifyJWT = asyncHandler(async (req, res, next) => {
  // this is encoded token as of now
  const token =
    req.cookies?.accessToken ||
    /** if not that then bearer token (giving access to all the headers like authorization, accept)*/ req
      .header("Authorization")
      ?.replace("Bearer ", "");

  if (!token) throw new ApiError(401, "Unauthorized request");

  try {
    // Now decoding the token since we have access to jwt it's easy to do that
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      /**removing these data*/ "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );
    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }
    req.user = user;
    next(); //to hop onto the next middleware or to proceed
  } catch (error) {
    throw new ApiError(401, "Invalid access token");
  }
});
