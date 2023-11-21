import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/app/lib/mongo";
import { IUser, User } from "@/app/lib/models";

export async function POST(req: NextRequest) {
    try {
        const { email, avatarUrl}: IUser = await req.json();
        if (!avatarUrl || !avatarUrl.startsWith("https://i.imgur.com/")) {
            return NextResponse.json({ error: "Avatar de Usuario Invalido" }, { status: 400 });
        }

        await connect();
        await User.findOneAndUpdate({email}, {avatarUrl});

        return NextResponse.json({ message: "Avatar updated successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Server Error" }, { status: 500});
    }
}