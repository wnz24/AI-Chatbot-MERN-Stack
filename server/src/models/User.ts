import mongoose from "mongoose";
import Chat from "./Chat";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
         type:String,
         required:true,
         unique:true 
    },
    password:{
        type:String,
        required:true
    },
    chats:[Chat]
     
    
    });

    export default mongoose.model("User", userSchema)