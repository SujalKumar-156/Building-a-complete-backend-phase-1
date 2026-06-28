import { body } from "express-validator";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty() //What happens in the case of it's being empty
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),

    // Now validating another field
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username must be in lower case")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    //it's a list so don't forget about ,
    body("password").trim().notEmpty().withMessage("Password is required"),

    body("fullName").optional().trim(),
  ];
};

const userLoginValidator = () => {
  return [
    // optional is for when username is there
    body("email").optional().isEmail().withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

export { userRegisterValidator, userLoginValidator };
