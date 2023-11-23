import mongoose, { Schema, Types, models } from "mongoose";

export interface IUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    avatarUrl?: string;
    createdAt: Date;
}

export interface IPost {
    _id: Types.ObjectId;
    content: string;
    createdAt: Date;
    userId: Types.ObjectId;
}

export interface IComment {
    _id: Types.ObjectId;
    content: string;
    createdAt: Date;
    userId: Types.ObjectId;
    postId: Types.ObjectId;
}

// mongo schemas

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatarUrl: { type: String, required: false },
    password: { type: String, required: true },
    createdAt: { type: Date, required: true },
});

const postSchema = new Schema<IPost>({
    content: { type: String, required: true },
    createdAt: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
});

const commentSchema = new Schema<IComment>({
    content: { type: String, required: true },
    createdAt: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    postId: { type: Schema.Types.ObjectId, required: true },
});

export const User = models.users || mongoose.model<IUser>("users", userSchema);
export const Post = models.posts || mongoose.model<IPost>("posts", postSchema);
export const Comment = models.comments || mongoose.model<IComment>("comments", commentSchema);