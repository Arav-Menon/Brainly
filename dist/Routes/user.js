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
const express_1 = require("express");
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post("signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password } = req.body;
    const newUser = yield db_1.UserModel.create({
        userName: userName,
        email: email,
        password: password
    });
    const token = jsonwebtoken_1.default.sign({
        userId: newUser._id
    }, process.env.JWT_USER_PASSWORD || "defualt_secret");
    res.json({
        message: "You're account is created",
        token
    });
}));
userRouter.post("signin", (req, res) => {
});
userRouter.put("edit-profile", (req, res) => {
});
userRouter.get("profile", (req, res) => {
});
userRouter.delete("delete", (req, res) => {
});
