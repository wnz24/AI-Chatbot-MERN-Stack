import { NextFunction, Request, Response } from "express";
import { COOKIE_NAME } from "../utils/constants";

const jwt = require("jsonwebtoken")

export const createToken = (id: any, email: string, expiresIn:any)=>{
    const payload = {id, email}
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:expiresIn
    })
    return token;
}
export const verifyToken = async (req:Request, res:Response, next:NextFunction) =>{
 const token = req.signedCookies[`${COOKIE_NAME}`];
 if(!token){
    res.status(401).json({message:"Token not recieved"})
 }
 return new Promise<void>((resolve,reject)=>{
   return jwt.verify(token,process.env.JWT_SECRET,(err: { message: any; } ,success: any)=>{
    if(err){
        reject(err.message);
        return res.status(401).json({message:"JWT-TOKEN expired"})
    }else{
        console.log('====================================');
        console.log("token verification successfull");
        console.log('====================================');
        resolve();
        res.locals.jwtData=success;
        return next();
    }
   }) 
 })
}    