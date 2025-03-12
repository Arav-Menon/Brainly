import mongoose, { mongo, Types } from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String
});

// const contentTypes = ["Image", "audio", "video", "article"];

const ContentSchema = new Schema({
    link: { type: String },  // Ensure required field is correctly defined
    title: { type: String },
    tag: { type: Types.ObjectId, ref: 'User', required: false },
    userId : { type: mongoose.Types.ObjectId, ref: 'User'}
});

// const TagsSchema = new Schema({
//     tag: { type: String, required: true, unique: true }
// });

// const LinkSchema = new Schema({
//     hash: { type: String, required: true },
//     userId: { type: Types.ObjectId, ref: 'User', required: true }
// });

// Debug log for models
console.log("Schemas created successfully!");

const UserModel = mongoose.model("User", UserSchema);
const ContentModel = mongoose.model("Content", ContentSchema);
// const TagsModel = mongoose.model("Tags", TagsSchema);
// const LinkModel = mongoose.model("Link", LinkSchema);

export { UserModel };
