import { NextResponse } from "next/server";
import { connect } from "@/app/lib/mongo";
import { IPost, Post } from "@/app/lib/models";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: any, res: any) {
    try {
        const { content }: IPost = await req.json();
        const session = await getServerSession(
            req as unknown as NextApiRequest,
            {
              ...res,
              getHeader: (name: string) => res.headers?.get(name),
              setHeader: (name: string, value: string) => res.headers?.set(name, value),
            } as unknown as NextApiResponse,
            authOptions
          );

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connect();
        await Post.create({content, createdAt: new Date(), userId: session.dbUser._id});

        console.log("Post saved " + session.dbUser.email + " " + content + " with id " + session.dbUser._id);

        return NextResponse.json({ message: "Post saved successfully" }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Server Error" }, { status: 500});
    }
}