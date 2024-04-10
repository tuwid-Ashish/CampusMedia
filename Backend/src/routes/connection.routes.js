import { Router } from "express";
import { AuthTokenverify } from "../middleware/Auth.middleware.js";
import { getSubscribedChannels, getUserChannelSubscribers, toggleSubscription } from "../controllers/connection.controller.js";


const router = Router();

router.route("/:connectId").post(AuthTokenverify,toggleSubscription)
router.route("/:followingToId/following").get(AuthTokenverify,getSubscribedChannels)
router.route("/:followingToId/followers").get(AuthTokenverify,getUserChannelSubscribers)

export default router;