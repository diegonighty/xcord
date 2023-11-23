"use client"
import { IPost } from '../lib/models'
import { ComposeTweet } from '@/components/form/write-form'
import { getPosts } from '../lib/manager/post.manager'
import { Posts } from '@/components/ui/posts';
import { useEffect, useState } from 'react';

export default function Page() {
    const [posts, setPosts] = useState<IPost[] | undefined>(undefined);

    useEffect(() => {
        (async () => {
            const posts: IPost[] | undefined = await getPosts({});
            setPosts(posts);
        })();
    }, []);

    return (
        <section className='z-50 p-4 grid grid-rows-2 h-screen'>
            <section className='grid grid-rows-2 justify-center'>
                <section className=''>
                    <ComposeTweet />
                </section>

                <section className=''>
                    {posts && <Posts posts={posts} />}
                </section>
            </section>
        </section>
    )
}