import { Router } from "express";
import {
  deleteMessage,
  getAllMessages,
  sendMessage,
} from "../controllers/message.controllers.js";
import { AuthTokenverify } from "../middleware/Auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { sendMessageValidator } from "../middleware/validate.js";
import { mongoIdPathVariableValidator } from "../middleware/mongodb.validators.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.use(AuthTokenverify);

router
  .route("/:chatId")
  .get(mongoIdPathVariableValidator("chatId"), validate, getAllMessages)
  .post(
    upload.fields([{ name: "attachments", maxCount: 5 }]),
    mongoIdPathVariableValidator("chatId"),
    sendMessageValidator(),
    validate,
    sendMessage
  );

//Delete message route based on Message id

router
  .route("/:chatId/:messageId")
  .delete(
    mongoIdPathVariableValidator("chatId"),
    mongoIdPathVariableValidator("messageId"),
    validate,
    deleteMessage
  );

export default router;
