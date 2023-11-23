import { IPost, IUser } from "../models";

/**
 * @returns An error message if the post creation failed, undefined otherwise
 */
export async function createPost({ content }: { content: string }): Promise<string | undefined> {
    const response = await fetch('/api/post/compose', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ content }),
    })

    if (!response.ok) {
        const { error } = await response.json()
        return error;
    }
}

export async function getPosts({ user }: { user: IUser | undefined }): Promise<IPost[] | undefined> {
    const response = await fetch('/api/post/get', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ userId: user?._id }),
    })

    if (!response.ok) {
        const { error } = await response.json()
        return error;
    }

    return await response.json();
}