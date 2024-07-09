import { Router } from 'express';
import {getAllUsers, login, signup} from "../controllers/user-controller"
import { loginvalidator, signupvalidator, validate } from '../middleware/validation-middleware';
const userroutes = Router()

 userroutes.get('/', getAllUsers)
 userroutes.post('/signup', validate(signupvalidator),signup)
 userroutes.post('/login', validate(loginvalidator),login)


export default userroutes 