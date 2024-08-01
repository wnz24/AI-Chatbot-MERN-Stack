import { Router } from "express";
import { verifyToken } from "../middleware/authentication";
import { chatcompletionvalidator } from "../middleware/validation-middleware";
import { deletechats, generateChatController, sendchatstouser } from "../controllers/chat-controller";

const chatroutes = Router();

chatroutes.post("/new", chatcompletionvalidator, verifyToken, generateChatController);
chatroutes.get("/all-chats",verifyToken,sendchatstouser);
chatroutes.delete("/delete-chats",verifyToken,deletechats);

export default chatroutes;
