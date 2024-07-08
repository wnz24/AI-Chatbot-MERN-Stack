import { Router } from 'express';
import getAllUsers from "../controllers/user-controller"
const userroutes = Router()

 userroutes.get('/', getAllUsers)


export default userroutes