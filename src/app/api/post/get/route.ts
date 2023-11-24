import { NextResponse } from "next/server";
import { connect } from "@/app/lib/mongo";
import { Post } from "@/app/lib/models";

export async function POST(req: any, res: any) {
    try {
        const { userId, page } = await req.json();
        let posts;

        await connect();
        
        let query;
        if (!userId) {
            query = Post.find({})
        } else {
            query = Post.find({ userId })
        }

        posts = query.sort({ createdAt: -1 });

        if (page) {
            query = query.skip(page === 1 ? 0 : page * 10).limit(10)
        }

        posts = await query;

        return NextResponse.json(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Server Error" }, { status: 500});
    }
}