import Image from "next/image";
import { IUser } from "@/app/lib/models";

export const DEFAULT_AVATAR_URL = "https://i.imgur.com/KnSH06R.png";

export function Avatar({user, width, height, alt, classNames}: {user: IUser, width?: number, height?: number, alt: string, classNames?: string}) {
    return (
        <Image width={width} height={height} className={"rounded " + classNames} src={user.avatarUrl || DEFAULT_AVATAR_URL} alt={alt}/>
    )
}

export function UrlAvatar({url, width, height, alt, classNames}: {url: string, width?: number, height?: number, alt: string, classNames?: string}) {
    return (
        <Image width={width} height={height} className={"rounded " + classNames} src={url || DEFAULT_AVATAR_URL} alt={alt}/>
    )
}