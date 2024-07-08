import { Router } from 'express';
import userroutes from './user-routes';
import chatroutes from './chat-routes';

const approuter = Router()

approuter.use('/user', userroutes ) //domain/api/v1/user
approuter.use('/chats', chatroutes ) //domain/api/v1/chats


export default approuter

