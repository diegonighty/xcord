import Image from "next/image";
import { IUser } from "@/app/lib/models";

export const DEFAULT_AVATAR_URL = "https://i.imgur.com/KnSH06R.png";

export function Avatar({user, width, height, alt}: {user: IUser, width?: number, height?: number, alt: string}) {
    return (
        <Image width={width} height={height} className="rounded mx-auto" src={user.avatarUrl || DEFAULT_AVATAR_URL} alt={alt}/>
    )
}