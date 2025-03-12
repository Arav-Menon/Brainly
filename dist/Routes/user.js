"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password } = req.body;
        const newUser = yield db_1.UserModel.create({
            userName: userName,
            email: email,
            password: password,
        });
        const token = jsonwebtoken_1.default.sign({
            userId: newUser._id,
        }, process.env.JWT_USER_PASSWORD || "default_secret");
        res.status(201).json({
            message: "Your account is created",
            token,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const foundUser = yield db_1.UserModel.findOne({
            email,
            password,
        });
        if (foundUser) {
            const token = jsonwebtoken_1.default.sign({
                userId: foundUser._id,
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
}));
userRouter.put("/update-profile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const updateProfile = yield db_1.UserModel.findOneAndUpdate({ email }, { password }, { new: true });
        if (!updateProfile) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Profile updated successfully", updateProfile });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}));
userRouter.get("/profile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Add profile fetch logic here
}));
userRouter.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Add delete logic here
}));
