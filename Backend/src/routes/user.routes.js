import { Router } from "express";
import { GetUsers, LogoutUser, RegiesterUser } from "../controllers/user.controller.js";
import { AuthTokenverify } from "../middleware/Auth.middleware.js";

const router = Router()

router.route("/signup").post(RegiesterUser)
router.route("/login").post(GetUsers)
// secure route using Middleware
router.route("/logout").post(AuthTokenverify,LogoutUser)
export default router