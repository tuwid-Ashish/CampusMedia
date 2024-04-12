import { Router } from "express";
import{ deletePost, getPostById, getPostsfeed, publishAPost, updatePost }   from "../controllers/post.controller.js"; 
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
  ]), publishAPost);

router.route("/get-allPosts").get(AuthTokenverify,getPostsfeed )
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

export default  router 