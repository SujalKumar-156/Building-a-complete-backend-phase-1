// Initial boilerplate is same
import { Router } from "express";
import { registerUser } from "../controllers/auth.controllers.js";

const router = Router();
// Be careful path is/register and method is post not get
router.route("/register").post(registerUser);

export default router;
