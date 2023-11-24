"use client"
import { ComposeTweet } from '@/components/form/write-form'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { InfiniteScrollPosts } from '@/components/ui/posts';

export default function Page() {
    const { data: session } = useSession();

    if (!session) {
        redirect("/")
    }

    return (
        <section className='z-50 p-4 grid grid-rows-2 h-screen'>
            <section className='grid grid-rows-2 justify-center'>
                <section className=''>
                    <ComposeTweet />
                </section>

                <section className=''>
                    <InfiniteScrollPosts />
                </section>
            </section>
        </section>
    )
}