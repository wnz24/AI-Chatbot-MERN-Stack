import { NextFunction, Request, Response } from "express";
import { COOKIE_NAME } from "../utils/constants";
const jwt = require("jsonwebtoken")

// Function to create a JWT token
export const createToken = (id: any, email: string, expiresIn: any) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });
  return token;
};

// Middleware to verify the JWT token
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.signedCookies[COOKIE_NAME];
  if (!token) {
    return res.status(401).json({ message: "Token not received" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "JWT-TOKEN expired" });
    }
    res.locals.jwtData = decoded;
    next();
  });
};
