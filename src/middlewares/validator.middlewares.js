import { validationResult } from "express-validator";
import { ApiError, ApirError } from "../utils/api-error.js";
import { error } from "node:console";

export const validate = (req, res, next) => {
  // It's an array
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  // If  there is errors now then
  // we need to extract the error and  pass it so the people can see it
  const extractedErrors = [];
  //   .array is for to be 100% sure that it's an array
  errors.array().map((err) =>
    extractedErrors.push({
      //   push like object so that we can get the path and error message
      [err.path]: err.msg,
    }),
  );
  throw new ApiError(422, "Recieved data is not valid", extractedErrors);
};
