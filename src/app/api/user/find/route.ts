import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/app/lib/mongo";
import { User } from "@/app/lib/models";

export async function POST(req: NextRequest) {
    try {
        await connect();
        const { email } = await req.json();
        const user = await User.findOne({ email });
        
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "An error ocurred while fetching the users" }, { status: 500})
    }
}