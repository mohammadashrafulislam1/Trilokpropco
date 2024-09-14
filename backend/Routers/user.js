import express from "express";
import { getCurrentUser, login, signup } from "../Controllers/UserController.js";
import { verifyToken } from "../MiddleWare/jwt.js";


export const userRouter = express.Router();

userRouter.post('/signup', signup)
userRouter.post('/login', login)
// Get current user route (protected)
userRouter.get('/me', verifyToken, getCurrentUser);