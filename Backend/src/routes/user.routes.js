import { Router } from "express";
import {
  GetCurrentUser,
  LogoutUser,
  RegiesterUser,
  UpdatePassword,
  emailer,
  forgotPassword,
  loginUsers,
} from "../controllers/user.controller.js";
import { AuthTokenverify } from "../middleware/Auth.middleware.js";

const router = Router();

router.route("/signup").post(RegiesterUser);
router.route("/emailverify").post(emailer);
router.route("/login").post(loginUsers);
router.route("/reset-password").post(forgotPassword);
// secure route using Middleware
router.route("/change-password").post(AuthTokenverify, UpdatePassword);
router.route("/current-user").get(AuthTokenverify, GetCurrentUser);
router.route("/logout").post(AuthTokenverify,LogoutUser);
export default router;
