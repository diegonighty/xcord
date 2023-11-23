import { signIn } from "next-auth/react";
import { IUser } from "../models";
import { API_URL } from "./api";
import { Types } from "mongoose";

/**
 * Log In an user with email and password
 * @param email - The email of the user
 * @param password - The password of the user
 * @returns Returns an error message if the login failed, undefined otherwise
 */
export async function logIn({ email, password }: { email: string; password: string }): Promise<string | undefined> {
    const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

    if (res?.error) {
        return res.error;
    }

    return;
}

export async function findUser({ _id }: { _id: Types.ObjectId }): Promise<IUser | undefined> {
    const response = await fetch(API_URL + "/api/user/find", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: _id.toString()
        })
    })

    const json = await response.json();

    if (!response.ok) {
        const { error } = json;
        console.error(error)
        return;
    }

    return JSON.parse(json);
}

/**
 * Register an user with email and password
 * @returns Returns an error message if the register failed, undefined otherwise
 */
export async function register({ name, email, password, avatarUrl }: { name: string; email: string; password: string; avatarUrl: string | undefined }): Promise<string | undefined> {
    const user = await fetch(API_URL + "/api/user/find", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email
        })
    })

    if (user.ok) {
        return "Ese correo ya tiene una cuenta registrada!"
    }

    const response = await fetch(API_URL + "/api/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password,
            avatarUrl
        })
    })

    if (!response.ok) {
        const { error } = await response.json()
        return error;
    }
}