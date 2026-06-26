// First there is some boilerplate code there
import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controller.js";

const router = Router();
// after route then path of routes then method which is get which is served by healthcheck
// There are many syntax for it this is the basic one
router.route("/").get(healthCheck);

// Note in prd path is /api/v1/healthcheck/
// Common practise of doing that is inside the app.js file
// Let's dive into it
// Now if user adds/instagram to the path/api/v1/healthcheck/instagram
// Then we just have to create it here in this file
// method will change accordingyl
// router.route("/instagram"). method which is going to be used

export default router;
// This is the bare minimum bolierplate code that we have to write every single time
// It's logic comes from controller
