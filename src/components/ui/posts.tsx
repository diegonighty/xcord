"use client"

import { findUser } from "@/app/lib/manager/user.manager";
import { IPost, IUser } from "@/app/lib/models";
import { Avatar } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

export function Post({ post }: { post: IPost }) {
    const [author, setAuthor] = useState<IUser | undefined>(undefined);
    useEffect(() => {
        (async () => {
            const author: IUser | undefined = await findUser({ _id: post.userId});
            setAuthor(author);
        })();
    }, [post.userId]);

    if (!author) {
        console.error("Post author not found in database" + post.userId + ", post: " + post._id);
        return <></>
    }

    return (
        <section className="grid grid-rows-2 bg-gray-800 border-2 border-dashed rounded-lg border-gray-700">
                <div className="grid grid-cols-2 justify-center items-center font-bold">
                    <Avatar user={author} width={64} height={64} alt="user photo" classNames="pt-4 pl-3 rounded w-25"/>
                    <h1 className="w-75">{author.name}</h1>
                </div>
                <textarea 
                    readOnly
                    className="w-full resize-none text-xl p-4 border-none bg-gray-800 outline-none scrollbar-thumb-sky-500 scrollbar-track-text-sky-700"
                >{post.content}</textarea>
        </section>
    )
}

export function Posts({ posts }: { posts: IPost[] }) {
    return (
        <section className="grid grid-rows-[200px_minmax(900px,_1fr)_100pxs gap-5">
            {posts.map((post) => 
                <Post key={post.content} post={post} />
            )}
        </section>
    )
}