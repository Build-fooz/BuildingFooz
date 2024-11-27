import express from 'express';
import { AddToFavorites, login, logout, register, RemoveFromFavorites, updateDetails, userDetails } from '../controllers/User.controller.js';
import { authUser } from '../middlewares/Auth.js';

const userRouter = express.Router()

userRouter.post('/login', login)
userRouter.post('/register', register)
userRouter.get('/get-profile', authUser, userDetails)
userRouter.put('/update-details', authUser, updateDetails)
userRouter.post('/logout', logout)
userRouter.post('/add-to-favorite', authUser, AddToFavorites)
userRouter.post('/remove-from-favorite', authUser, RemoveFromFavorites)



export default userRouter