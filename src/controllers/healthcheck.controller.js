import { response } from "express";
import { ApiResponse } from "../utils/api-respons.js";
// Now import async-handler
import { asyncHandler } from "../utils/async-handler.js";

// Below whole healthcheck is request handler so we are passing a parameter of this request in async-handler.js in utils folder
//                                  next is used for middleware to pass onto things
/*
const healthCheck = async (req, res, next) => {
  // There can be cases when there can be error so let's use try catch
  try {
    //   We might want data from db
    //   ----------------------------------------------------
    // There are 2 important things in db which we have to take care about
    // 1) DB might throw error : try catch or better way(my thinking)
    // 2) DB iis in another continent so it may take time(use of async await my thinking  )
    // I want to send whole as json
    res.status(200).json(
      //   I want to create a new api repsonse and since this is a class we made
      // So we can create a obj of it
      new ApiResponse(200, { message: "Server is running" }),
    );
  } catch (error) {
    // This is express built in error handler
    next(error);
    //   use this next and pass onto the error
  }
  // Now this above try catch can be written in better way
};
 */
// WE are creating the healthcheck method but we'll write everything in asynchandler()
// It's just a wrapper function which we are using and we don't have to pass next and all everytime it
const healthCheck = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, { message: "Server is up and running" }));
});

export { healthCheck };
// After controller now works on routes
