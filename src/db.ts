import mongoose, { Types } from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

const contentTypes = ["Image", "audio", "video", "article"];

const ContentSchema = new Schema({
    link: { type: String, required: false },  // Ensure required field is correctly defined
    title: { type: String, required: false },
    type: { type: String, enum: contentTypes, required: false },
    tag: { type: Types.ObjectId, ref: 'User', required: false }
});

const TagsSchema = new Schema({
    tag: { type: String, required: true, unique: true }
});

const LinkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: 'User', required: true }
});

// Debug log for models
console.log("Schemas created successfully!");

const UserModel = mongoose.model("User", UserSchema);
const ContentModel = mongoose.model("Content", ContentSchema);
const TagsModel = mongoose.model("Tags", TagsSchema);
const LinkModel = mongoose.model("Link", LinkSchema);

export { UserModel, ContentModel, TagsModel, LinkModel };
