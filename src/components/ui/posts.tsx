"use client"

import { getPosts } from "@/app/lib/manager/post.manager";
import { findUser } from "@/app/lib/manager/user.manager";
import { IPost, IUser } from "@/app/lib/models";
import { Avatar } from "@/components/ui/avatar";
import { Types } from "mongoose";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export function Post({ post }: { post: IPost }) {
    const [author, setAuthor] = useState<IUser | undefined>(undefined);
    useEffect(() => {
        (async () => {
            const author: IUser | undefined = await findUser({ _id: post.userId});
            setAuthor(author);
        })();
    }, [post.userId]);

    if (!author) {
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
                    defaultValue={post.content}
                    className="w-full resize-none text-xl p-4 border-none bg-gray-800 outline-none scrollbar-thumb-sky-500 scrollbar-track-text-sky-700"
                />
        </section>
    )
}

export function Posts({ posts }: { posts: IPost[] }) {
    return (
        <section className="grid grid-rows-[200px_minmax(900px,_1fr)_100pxs gap-5">
            {posts.map((post) => 
                <Post key={post._id.toString()} post={post} />
            )}
        </section>
    )
}

export function InfiniteScrollPosts({ userId }: { userId?: Types.ObjectId }) {
    const [posts, setPosts] = useState<IPost[] | undefined>(undefined);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    const fetchMoreData = async () => {
        const newPosts: IPost[] | undefined = await getPosts({ page, user: userId });
        setPosts([...(posts || []), ...(newPosts || [])]);

        if (newPosts?.length === 0) {
            setHasMore(false);
        }

        setPage(page + 1);
    }

    useEffect(() => {
        fetchMoreData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    if (!posts) {
        return <></>
    }

    return (
        <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Cargando...</h4>}
        >
            <Posts posts={posts} />
        </InfiniteScroll>
    )
}