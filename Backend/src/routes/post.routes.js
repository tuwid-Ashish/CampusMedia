import { Router } from "express";
import{ deletePost, getAllPosts, getPostById, updatePost }   from "../controllers/post.controller.js"; 
import { AuthTokenverify } from "../middleware/Auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();

router.route("/create-post").post(AuthTokenverify, upload.fields([
    {
      name: "images",
      maxCount: 5,
    },
    {
      name: "videos",
      maxCount: 2,
    },
  ]), createPost);

router.route("/get-allPosts").get(AuthTokenverify,getAllPosts)
router.route("/get-post").post(AuthTokenverify,getPostById)
router.route("/delete-post").post(AuthTokenverify,deletePost)
router.route("/update-post").post(AuthTokenverify,upload.fields([
    {
      name: "images",
      maxCount: 5,
    },
    {
      name: "videos",
      maxCount: 2,
    },
  ]),updatePost)