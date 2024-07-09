import { NextFunction, Request, Response } from "express";
import User from "../models/User";

//getalluser
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    if (!users) {
      console.log("user not found");
    }
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error });
  }
};

//user signup
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("req body: ", req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("Missing required fields");
    }
    const existinguser = await User.findOne({email})
    if (existinguser) {
      return res.status(401).send("User already Exist")
    }
    const user = await User.create({ name, email, password });
    await user.save();
    return res.status(201).json({ success: true, id: user._id });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error });
  }
};

// user login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("req body: ", req.body);
    const {email, password } = req.body;
    if ( !email || !password) {
      throw new Error("Missing required fields");
    }
    const user = await User.findOne({email}) 
    if(!user){
    return res.status(401).json({succes: false,message: "Invalid Credentials"})
    }
    const Match = await user.comparePassword(password)
   if(!Match){
    return res.status(401).json({succes: false,message: "Invalid Password"})
   }
    return res.status(201).json({ success: true, user }); 
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error });
  }
};
