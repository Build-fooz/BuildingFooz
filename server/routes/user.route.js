import express from 'express';
import { login, logout, register, updateDetails, userDetails } from '../controllers/User.controller.js';
import { authUser } from '../middlewares/Auth.js';

const userRouter = express.Router()

userRouter.post('/login', login)
userRouter.post('/register', register)
userRouter.get('/get-profile', authUser, userDetails)
userRouter.put('/update-details', authUser, updateDetails)
userRouter.post('/logout', logout)



export default userRouter