import { Router } from "express";
import { AuthTokenverify } from "../middleware/Auth.middleware.js";
import { getLikedComments, getLikedPosts, toggleCommentLike, togglePostLike,  } from "../controllers/like.controller.js";
const router = Router();

router.route("/toggle-like/:postId").post(AuthTokenverify, togglePostLike);
router.route("/toggle-comment-like/:commentId").post(AuthTokenverify, toggleCommentLike);
router.route("/get-liked-posts").get(AuthTokenverify, getLikedPosts);
router.route("/get-liked-comments").get(AuthTokenverify, getLikedComments);
export default router;