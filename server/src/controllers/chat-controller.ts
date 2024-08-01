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

    // Ensure chats array exists
    if (!user.chats) user.chats = [];

    // Grab chats of user with allowed roles
    const chats = user.chats.map(({ role, content }) => ({ role: role as Role, content }));
    chats.push({ content: message, role: "user" });

    user.chats.push({
      content: message,
      role: "user",
      id: "",
    });

    // Send all chats with new one to OpenAI
    const openai: OpenAI = configureopenai();

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", 
      messages: chats,
    });

    const latestResponse = chatResponse.choices[0]?.message;
    const latestContent = latestResponse?.content ?? ""; // Handle null or undefined

    user.chats.push({
      content: latestContent,
      role: "assistant",
      id: "",
    });

    await user.save();

    return res.json({ message: latestContent, chats: user.chats });
  } catch (error) {
    console.error("Error in generateChatController:", error);
    return res.status(500).json({ message: "Something went wrong",error });
  }
};


//send chats to user
export const sendchatstouser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: any = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ succes: false, message: "User not Registered or Token malfunctioned " });
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(200).json("Permissions didn't match");
    }

    return res.status(200).json({ success: true, chats:user.chats });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error });
  }
};
//delte chats
export const deletechats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: any = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ succes: false, message: "User not Registered or Token malfunctioned " });
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(200).json("Permissions didn't match");
    }
   user.chats =[];
   await user.save();
    return res.status(200).json({ success: true  });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error });
  }
};
