// Initial boilerplate is same
import { Router } from "express";
import {
  login,
  logoutUser,
  registerUser,
} from "../controllers/auth.controllers.js";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validators/index.js";
import { validate } from "../middlewares/validator.middlewares.js";
// for logout
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();
// Be careful path is/register and method is post not get
// First of all we have to bring in all the data/methods which we are writing

router
  .route("/register")
  .post(
    userRegisterValidator(),
    validate /*this validate is just the middleware*/,
    registerUser,
  ); // since req s going from a to b i.e reached to server route now waiting t be used by user registration
// And we want to intercept in between

router.route("/login").post(userLoginValidator(), validate, login);
// In this case of logout it can be both get or post request
// Remember, middleware we don't execute we just pass the reference for it
// secure routes
router.route("/logout").post(verifyJWT, logoutUser);
export default router;
