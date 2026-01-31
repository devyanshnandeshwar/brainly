import mongoose, { model, Schema } from "mongoose";

mongoose.connect("mongodb://localhost:27017/yourdbname");

const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String
})

export const UserModel = model("Users", UserSchema);

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tags' }],
    type: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'Users', required: true }
})

export const ContentModel = model("Contents", ContentSchema);