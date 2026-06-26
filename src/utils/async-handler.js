// In the input itself we are taking a function usecase : from healthcheck.controller.js
const asyncHandler = (requestHandler) => {
  // Returning a function : classical defination of higher order function
  return (req, res, next) => {
    //   I will promisify this
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};
// Now we don't have tp write try catch everytime
// this asynchandler doesn't mean we don't have to write async and await we still have to

export { asyncHandler };
