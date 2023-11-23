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

export async function getPosts({ user }: { user?: IUser }): Promise<IPost[] | undefined> {
    const response = await fetch(API_URL + '/api/post/get', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ userId: user?._id }),
    })

    const json = await response.json();

    if (!response.ok) {
        const { error } = json;
        return error;
    }

    return JSON.parse(json);
}