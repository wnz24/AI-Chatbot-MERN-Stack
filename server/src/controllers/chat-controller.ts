import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { configureopenai } from "../middleware/openai-config";
import { OpenAI } from "openai";

// Define allowed roles
type Role = "system" | "user" | "assistant" | "function";

export const generateChatController = async (req: Request, res: Response, next: NextFunction) => {
  const { message } = req.body;

  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(401).json({ message: "User not registered OR the token malfunctioned" });

    // Grab chats of user with allowed roles
    const chats = user.chats.map(({ role, content }) => ({ role: role as Role, content }));
    chats.push({ content: message, role: "user" as Role });
    user.chats.push({
      content: message,
      role: "user",
      id: "",
    });

    // Send all chats with new one to OpenAI
    const openai = configureopenai();

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Ensure this model exists
      messages: chats,
    });

    const latestResponse = chatResponse.choices[0]?.message;
    const latestContent = latestResponse?.content ?? ""; // Handle null or undefined

    user.chats.push({
      content: latestContent,
      role: "assistant" as Role,
      id: "",
    });

    await user.save();

    return res.json({ message: latestContent,chats:user.chats });
  } catch (error) {
    return res.json({ message: "Something is wrong" }) // Handle errors properly
  }
};
