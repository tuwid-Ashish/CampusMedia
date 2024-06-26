import { Router } from "express";
import {
  AddExperience,
  GetCurrentUser,
  GetExpreince,
  LogoutUser,
  RegiesterUser,
  UpdateExperience,
  UpdatePassword,
  emailer,
  forgotPassword,
  getUserChannelProfile,
  loginUsers,
  updateAccountdetails,
  updateAvatar,
  updateCoverImage,
} from "../controllers/user.controller.js";
import { AuthTokenverify } from "../middleware/Auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();

router.route("/signup").post(RegiesterUser);
router.route("/emailverify").post(emailer);
router.route("/login").post(loginUsers);
router.route("/reset-password").post(forgotPassword);
// secure route using Middleware
router.route("/change-password").post(AuthTokenverify, UpdatePassword);
router.route("/current-user").get(AuthTokenverify, GetCurrentUser);
router.route("/logout").get(AuthTokenverify,LogoutUser);
router.route("/avatar").patch(AuthTokenverify, upload.single("profileImage"), updateAvatar);
router.route("/coverImage").patch(AuthTokenverify, upload.single("bannerImage"), updateCoverImage);
router.route("/update-profile").post(AuthTokenverify, updateAccountdetails);
router.route("/Add-Exprience").post(AuthTokenverify, AddExperience);
router.route("/update-Exprience").patch(AuthTokenverify,UpdateExperience)
router.route("/get-exprience").get(AuthTokenverify,GetExpreince)
router.route("/:username").get(AuthTokenverify,getUserChannelProfile)
export default router;
