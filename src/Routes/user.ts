import express,{ Router, Request, Response } from "express";
import { UserModel } from "../db";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { userMiddlewares } from "../Middlewares/user";
import z from 'zod';
import bcrypt from 'bcrypt';

const userRouter: Router = express.Router(); 

userRouter.post("/signup", async (req, res) => {
  try {

    const inputValidation = z.object({
      userName : z.string().min(3).max(49),
      email : z.string().email(),
      password : z.string().min(4).max(50)
    })

    const parseData = inputValidation.safeParse(req.body);

    if(!parseData.success) {
      res.json({
        message : "Incorrect format",
        error : parseData.error
      })
      return;
    }

    const { userName, email, password } = req.body;

    const hashedPassowrd = await bcrypt.hash(password , 5);

    const newUser = await UserModel.create({
      userName: userName,
      email: email,
      password: hashedPassowrd,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_USER_PASSWORD as string || "default_secret"
    );

    res.status(201).json({
      message: "Your account is created",
      token,
    });
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await UserModel.findOne({
      email,
    });

    if (foundUser && await bcrypt.compare(password, foundUser.password as string) ) {
      const token = jwt.sign(
        {
          id: foundUser._id,
        },
        process.env.JWT_USER_PASSWORD || "default_secret"
      );
      res.status(200).json({
        message: "You're sigin",
        token,
      });
    } else {
      res.status(400).json({
        message: "inccorect credentials",
      });
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

userRouter.put("/update-profile", userMiddlewares , async (req: Request, res: Response) => {
    
  try {
      const { email, password } = req.body;
  
      if (!email || !password) {
         res.status(400).json({ message: "Email and password are required" });
      }
  
      const updateProfile = await UserModel.findOneAndUpdate(
        { email },
        { password },
        { new: true }
      );
  
      if (!updateProfile) {
        res.status(404).json({ message: "User not found" });
      }
  
       res.status(200).json({ message: "Profile updated successfully", updateProfile });
    } catch (error) {
      console.error(error);
       res.status(500).json({ error: "Something went wrong" });
    }
  });
  

userRouter.get("/profile", userMiddlewares, async (req : Request , res : Response) => {

  const profile = await UserModel.find();

  if(!profile) {
    res.status(404).json({
      message : "User not found"
    })
  }

  res.json({
    message : "Your profile data",
    profile
  })

});

userRouter.delete("/delete", userMiddlewares ,async (req : Request, res : Response) => {

  const { userName, email, password } = req.body;

  const rmUser = await UserModel.findOneAndDelete({
    userName,
    email,
    password
  })

  if(!rmUser) {
    res.status(404).json({
      message : "User not found"
    })
  }

  res.status(204).json({
    message : "User removed",
    rmUser
  })

});

export { userRouter };
