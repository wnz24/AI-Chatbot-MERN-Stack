import { Router } from "express";
import { getAllUsers, login, signup, verifyuser } from "../controllers/user-controller";
import { loginvalidator, signupvalidator, validate } from "../middleware/validation-middleware";
import { verifyToken } from "../middleware/authentication";
const userroutes = Router();

userroutes.get("/", getAllUsers);
userroutes.post("/signup", validate(signupvalidator), signup);
userroutes.post("/login", validate(loginvalidator), login);
userroutes.get("/auth-status", verifyToken, verifyuser);

export default userroutes;
