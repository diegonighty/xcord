import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/app/lib/mongo";
import { User } from "@/app/lib/models";
import { Types } from "mongoose";

export async function POST(req: NextRequest) {
    try {
        const { userId, email } = await req.json();
        let user;

        await connect();
        
        if (!userId) {
            user = await User.findOne({ email });
        } else {
            user = await User.findById(new Types.ObjectId(userId));
        }

        user.password = undefined;
        return NextResponse.json(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Server Error" }, { status: 500});
    }
}