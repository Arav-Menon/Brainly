"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const user_1 = require("../Middlewares/user");
const contentRouter = (0, express_1.Router)();
exports.contentRouter = contentRouter;
contentRouter.post("/create-content", user_1.userMiddlewares, async (req, res) => {
    const { link, title } = req.body;
    const createContent = await db_1.ContentModel.create({
        link,
        title
    });
    res.status(201).json({
        message: "Content created",
        createContent
    });
});
