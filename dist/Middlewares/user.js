"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddlewares = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const userMiddlewares = (req, res, next) => {
    const header = req.headers['authorization'];
    const decode = jsonwebtoken_1.default.verify(header, process.env.JWT_USER_PASSWORD || "default_secret");
    if (decode) {
        //@ts-ignore
        req.userId = decode.id;
        next();
    }
    else {
        res.status(403).json({
            message: "You're not loggedIn"
        });
    }
};
exports.userMiddlewares = userMiddlewares;
