import { signIn } from "next-auth/react";

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

/**
 * Register an user with email and password
 * @returns Returns an error message if the register failed, undefined otherwise
 */
export async function register({ name, email, password, avatarUrl }: { name: string; email: string; password: string; avatarUrl: string | undefined }): Promise<string | undefined> {
    const user = await fetch("/api/user/find", {
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

    const response = await fetch("/api/user/register", {
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