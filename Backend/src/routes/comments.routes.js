import { Router } from "express";
import { AuthTokenverify } from "../middleware/Auth.middleware.js";
import { addComment, deleteComment, getPostComments, updateComment } from "../controllers/comment.controller";
const router = Router();

router.route("/getc-comments/{postId}").get(AuthTokenverify, getPostComments);
router.route("/add-comment/{postId}").post(AuthTokenverify, addComment);
router.route("/delete-comment/{commentId}").delete(AuthTokenverify, deleteComment);
router.route("/update-comment").put(AuthTokenverify, updateComment);

export default router;