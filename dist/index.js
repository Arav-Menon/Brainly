"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./Routes/user");
const mongoose_1 = __importDefault(require("mongoose"));
const createContent_1 = require("./Routes/createContent");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/user", user_1.userRouter);
app.use("/api/v1/content", createContent_1.contentRouter);
const main = async () => {
    try {
        await mongoose_1.default.connect("mongodb+srv://Arav_menon:UGMeIo8G4nva9xRj@cluster0.cbwjn.mongodb.net/Brainly");
        console.log("Conneted ti mongoDB");
        app.listen(5000, () => {
            console.log("Server is running");
        });
    }
    catch (error) {
        console.log("Database error");
        process.exit(1);
    }
};
main();
