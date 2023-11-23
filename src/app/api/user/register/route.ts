import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/app/lib/mongo";
import { IUser, User } from "@/app/lib/models";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password, avatarUrl}: IUser = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        if (avatarUrl && !avatarUrl.match(/(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.gif)(\?[^\s[",><]*)?/)) {
            return NextResponse.json({ error: "Sólo se permiten imagenes (.png, .jpg y .gif)" }, { status: 400 });
        }

        await connect();
        await User.create({name, email, password: hashedPassword, createdAt: new Date(), avatarUrl});

        return NextResponse.json({ message: "User registered successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Server Error" }, { status: 500});
    }
}