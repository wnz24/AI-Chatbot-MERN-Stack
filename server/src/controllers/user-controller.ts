import { NextFunction,Request, Response } from "express"
import User from "../models/User"
const bcrypt = require('bcrypt');


//hash password
const hashpassword = async (password:string): Promise<string> =>{
  try {
    const salt = await bcrypt.genSalt(10)
    console.log('Generated Salt:', salt);  // Debug log
    if(!salt){
      throw new Error('Error while salt generation')
    }
    const hash = await bcrypt.hash(password, salt);
    if (!hash) {
      console.log("error hashing password")
    }
    console.log('Generated Hash:', hash);  // Debug log
    return hash;
  } catch (error:any) {
   throw new Error(`Error hashing Password ${error.message}`)
  }
} 
//getalluser
export const getAllUsers = async (req:Request, res:Response , next:NextFunction)=>{
 try {
    const users = await User.find()
    if (!users) {
        console.log("user not found")
    }
   return res.status(200).json({success:true,users})
 } catch (error) {
    console.log(error)
   return res.status(400).json({success:false, error})
 }
}


//user signup
export const signup = async (req:Request, res:Response , next:NextFunction)=>{
  try {
    console.log("req body: ",req.body)
    const {name,email,password}= req.body
    if (!name || !email || !password) {
      throw new Error('Missing required fields');
    }
    const hashedPassword = await hashpassword(password)
    console.log('Hased Password:', hashedPassword)
    const user = await User.create({name,email,password:hashedPassword})
   return res.status(200).json({success:true, user})
  } catch (error) {
     console.log(error)
    return res.status(400).json({success:false, error})
  }
 }





