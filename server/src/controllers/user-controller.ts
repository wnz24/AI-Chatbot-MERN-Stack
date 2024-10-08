import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { createToken } from "../middleware/authentication";
import { COOKIE_NAME } from "../utils/constants";

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
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(401).send("User already Exist");
    }
    const user: any = await User.create({ name, email, password });
    await user.save();

    //create token and save cookie
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });
    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });
    return res.status(200).json({ success: true, name: user.name, email: user.eamil });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error });
  }
};

// Logout
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Clear the cookie
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({ success: true });
  } catch (error ) {
    console.error(error);
    return res.status(500).json({ success: false, error});
  }
};
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("req body: ", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Missing required fields");
    }
    const user: any = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ succes: false, message: "Invalid Credentials" });
    }
    const Match = await user.comparePassword(password);
    if (!Match) {
      return res.status(401).json({ succes: false, message: "Invalid Password" });
    }

    //create token and save cookie
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });
    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });
    return res.status(200).json({ success: true, name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error });
  }
};

//verity user
export const verifyuser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: any = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not Registered or Token malfunctioned " });
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(200).json("Permissions didn't match");
    }

    return res.status(200).json({ success: true, name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error });
  }
};
