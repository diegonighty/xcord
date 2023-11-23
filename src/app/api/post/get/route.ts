import { NextResponse } from "next/server";
import { connect } from "@/app/lib/mongo";
import { IPost, Post } from "@/app/lib/models";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: any, res: any) {
    try {
        const { userId } = await req.json();
        let posts;

        await connect();
        
        if (!userId) {
            posts = await Post.find({}).sort({ createdAt: -1 });    
        } else {
            posts = await Post.find({ userId }).sort({ createdAt: -1 });
        }

        console.log("Posts retrieved " + JSON.stringify(posts));
        return NextResponse.json(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Server Error" }, { status: 500});
    }
}