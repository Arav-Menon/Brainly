"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String
});
// const contentTypes = ["Image", "audio", "video", "article"];
// const ContentSchema = new Schema({
//     link: { type: String, required: false },  // Ensure required field is correctly defined
//     title: { type: String, required: false },
//     type: { type: String, enum: contentTypes, required: false },
//     tag: { type: Types.ObjectId, ref: 'User', required: false }
// });
// const TagsSchema = new Schema({
//     tag: { type: String, required: true, unique: true }
// });
// const LinkSchema = new Schema({
//     hash: { type: String, required: true },
//     userId: { type: Types.ObjectId, ref: 'User', required: true }
// });
// Debug log for models
console.log("Schemas created successfully!");
const UserModel = mongoose_1.default.model("User", UserSchema);
exports.UserModel = UserModel;
