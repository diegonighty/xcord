import { Types } from "mongoose";
import { IPost, IUser } from "../models";
import { API_URL } from "./api";

/**
 * @returns An error message if the post creation failed, undefined otherwise
 */
export async function createPost({ content }: { content: string }): Promise<string | undefined> {
    const response = await fetch(API_URL + '/api/post/compose', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ content }),
    })

    if (!response.ok) {
        const { error } = await response.json()
        return error;
    }
}

export async function getPosts({ user, page }: { user?: IUser | Types.ObjectId | string; page?: number }): Promise<IPost[] | undefined> {
    const id = user === undefined ? undefined : typeof user === "string" ? user : user._id.toString();

    const response = await fetch(API_URL + '/api/post/get', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ userId: id, page }),
    })

    const json = await response.json();

    if (!response.ok) {
        const { error } = json;
        return error;
    }

    return JSON.parse(json);
}