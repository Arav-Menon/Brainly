import { Router } from "express";
import { UserModel } from "../db";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const userRouter = Router();

userRouter.post("signup", async (req, res) => {

    const { userName, email, password } = req.body;

    const newUser = await UserModel.create({
        userName : userName,
        email : email,
        password : password
    });

    const token = jwt.sign({
        userId : newUser._id
    }, process.env.JWT_USER_PASSWORD || "defualt_secret" )

    res.json({
        message : "You're account is created",
        token 
    })
})

userRouter.post("signin", (req, res) => {
    
})

userRouter.put("edit-profile", (req, res) => {
    
})

userRouter.get("profile", (req, res) => {
    
})

userRouter.delete("delete", (req, res) => {
    
})

export {userRouter}