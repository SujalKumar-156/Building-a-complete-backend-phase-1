import { response } from "express";
import { ApiResponse } from "../utils/api-respons";

const healthCheck = (req, res) => {
  // There can be cases when there can be error so let's use try catch
  try {
    // I want to send whole as json
    res.status(200).json(
      //   I want to create a new api repsonse and since this is a class we made
      // So we can create a obj of it
      new ApiResponse(200, { message: "Server is running" }),
    );
  } catch (error) {}
};

export { healthCheck };
// After controller now works on routes
