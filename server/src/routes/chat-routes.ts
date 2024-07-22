import { Router } from "express";
import { verifyToken } from "../middleware/authentication";
import { chatcompletionvalidator } from "../middleware/validation-middleware";
import { generateChatController } from "../controllers/chat-controller";

const chatroutes = Router();

chatroutes.post("/new", chatcompletionvalidator, verifyToken, generateChatController);

export default chatroutes;
