import express,{ Router, Request, Response } from "express";
import { UserModel } from "../db";
import jwt from "jsonwebtoken";
import "dotenv/config";

const userRouter: Router = express.Router(); 

userRouter.post("/signup", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const newUser = await UserModel.create({
      userName: userName,
      email: email,
      password: password,
    });

    const token = jwt.sign(
      {
        userId: newUser._id,
      },
      process.env.JWT_USER_PASSWORD || "default_secret"
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
      password,
    });

    if (foundUser) {
      const token = jwt.sign(
        {
          userId: foundUser._id,
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

// userRouter.put("/update-profile", async (req: Request, res: Response) => {
//     try {
//       const { email, password } = req.body;
  
//       if (!email || !password) {
//         return res.status(400).json({ message: "Email and password are required" });
//       }
  
//       const updateProfile = await UserModel.findOneAndUpdate(
//         { email },
//         { password },
//         { new: true }
//       );
  
//       if (!updateProfile) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       return res.status(200).json({ message: "Profile updated successfully", updateProfile });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: "Something went wrong" });
//     }
//   });
  

userRouter.get("/profile", async (req, res) => {
  // Add profile fetch logic here
});

userRouter.delete("/delete", async (req, res) => {
  // Add delete logic here
});

export { userRouter };
