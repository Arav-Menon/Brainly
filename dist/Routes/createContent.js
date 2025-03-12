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
contentRouter.get("/content", user_1.userMiddlewares, async (req, res) => {
    const contents = await db_1.ContentModel.find();
    if (!contents) {
        res.status(404).json({
            message: "You're not logIn"
        });
    }
    res.json({
        message: "Data",
        contents
    });
});
contentRouter.put("/update-content", user_1.userMiddlewares, async (req, res) => {
    try {
        const { link, title } = req.body;
        const findUpdate = await db_1.ContentModel.findOneAndUpdate({
            link,
            title
        });
        if (!findUpdate) {
            res.status(404).json({
                message: "Content not found"
            });
        }
        res.status(200).json({
            message: "Content updated",
            findUpdate
        });
    }
    catch (e) {
        res.json({
            e: e
        });
    }
});
contentRouter.delete("/delete-content", user_1.userMiddlewares, async (req, res) => {
    const { title, link } = req.body;
    const deleteContent = await db_1.ContentModel.findOneAndDelete({
        title,
        link
    });
    if (!deleteContent) {
        res.status(404).json({
            message: "Data not found"
        });
    }
    res.status(204).json({
        message: "Delted succesfully",
        deleteContent
    });
});
