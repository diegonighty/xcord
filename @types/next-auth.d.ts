import { DefaultSession } from "next-auth";
import { IUser } from "@/app/lib/models";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
        } & DefaultSession["user"],
        dbUser: IUser;
    }
}