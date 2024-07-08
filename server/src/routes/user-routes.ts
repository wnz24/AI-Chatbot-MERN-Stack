import { Router } from 'express';
import {getAllUsers, signup} from "../controllers/user-controller"
const userroutes = Router()

 userroutes.get('/', getAllUsers)
 userroutes.post('/', signup)


export default userroutes 