"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.TagsModel = exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    userName: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
});
const contentTypes = ["Image", "audio", "video", "article"];
const ContentSchema = new Schema({
    link: { type: String, require: true },
    title: { type: String, require: true },
    type: { type: String, enum: contentTypes, require: true },
    tag: { type: mongoose_1.Types.ObjectId, ref: 'User', require: true }
});
const TagsSchema = new Schema({
    tag: { String: String, require: true, unique: true }
});
const LinkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
});
const UserModel = mongoose_1.default.model("User", UserSchema);
exports.UserModel = UserModel;
const ContentModel = mongoose_1.default.model("content", ContentSchema);
exports.ContentModel = ContentModel;
const TagsModel = mongoose_1.default.model("Tags", TagsSchema);
exports.TagsModel = TagsModel;
const LinkModel = mongoose_1.default.model("Link", LinkSchema);
exports.LinkModel = LinkModel;
