"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.post("/signup", async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const newUser = await db_1.UserModel.create({
            userName: userName,
            email: email,
            password: password,
        });
        const token = jsonwebtoken_1.default.sign({
            id: newUser._id,
        }, process.env.JWT_USER_PASSWORD || "default_secret");
        res.status(201).json({
            message: "Your account is created",
            token,
        });
    }
    catch (error) {
        console.log(error);
    }
});
userRouter.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await db_1.UserModel.findOne({
            email,
            password,
        });
        if (foundUser) {
            const token = jsonwebtoken_1.default.sign({
                id: foundUser._id,
            }, process.env.JWT_USER_PASSWORD || "default_secret");
            res.status(200).json({
                message: "You're sigin",
                token,
            });
        }
        else {
            res.status(400).json({
                message: "inccorect credentials",
            });
        }
    }
    catch (error) {
        res.json({
            error: error,
        });
    }
});
userRouter.put("/update-profile", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
        }
        const updateProfile = await db_1.UserModel.findOneAndUpdate({ email }, { password }, { new: true });
        if (!updateProfile) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Profile updated successfully", updateProfile });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
userRouter.get("/profile", async (req, res) => {
    // Add profile fetch logic here
});
userRouter.delete("/delete", async (req, res) => {
    // Add delete logic here
});
