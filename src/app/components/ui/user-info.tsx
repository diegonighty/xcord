"use client"

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Avatar } from "./avatar";
import { formatDate } from "@/app/lib/utils";
import { useState } from "react";

export function UserInfo() {
    const { data: session, update } = useSession();
    const [avatarUrl, setAvatarUrl] = useState("")
    const [error, setError] = useState("")
    const email = session?.user?.email

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!avatarUrl) {
            setError("Por favor, ingrese una URL de imagen.")
            return
        }

        try {
            const response = await fetch("/api/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    avatarUrl
                })
            })

            if (response.ok) {
                update({ avatarUrl: avatarUrl})
                window.location.reload()
                return
            } else {
                const error = await response.json()
                setError(error.error)
                return
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (!session) return (<></>)
    const { dbUser } = session;
    const date = formatDate(dbUser.createdAt);

    return (
        <div className="flex items-center pt-10 justify-center">
            <div className="max-w-xs">
                <div className="bg-black shadow-lg p-5 rounded-lg border-t-4 border-black">
                    <div className="photo-wrapper p-2">
                        <Avatar user={dbUser} width={128} height={128} alt="user photo"/>
                    </div>
                    <div className="p-5">
                        <h3 className="text-center text-xl font-medium leading-8">{dbUser.name}</h3>
                        <div className="text-center text-gray-400 text-xs font-semibold">
                            <p>Se unío el {date}</p>
                        </div>
                        <table className="text-xs my-3">
                            <tbody>
                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">Correo</td>
                                <td className="px-2 py-2">{email}</td>
                            </tr>
                        </tbody></table>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-3 my-3">
                            <input
                              onChange={(e) => setAvatarUrl(e.target.value)}
                              type="url"
                              placeholder={dbUser.avatarUrl}
                            />

                            <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold cursor-pointer px-6 py-2">
                              Actualizar Perfil
                            </button>

                            {error && (
                              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2 mr-5 ">
                                <p>{error}</p>
                              </div>
                            )}
                        </form>
                  
                        <button onClick={() => signOut()} className="ml-10 bg-sky-500 hover:bg-sky-700 text-center my-3 font-bold cursor-pointer px-6 py-2">
                                Cerrar Sesion
                        </button>      
                    </div>
                </div>
            </div>
        </div>
    )
}