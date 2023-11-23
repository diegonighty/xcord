"use client"
import { useSession } from "next-auth/react";
import { Avatar } from "../ui/avatar";
import { useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { createPost } from "@/app/lib/manager/post.manager";
import { useRouter } from "next/navigation";

export function ComposeTweet() {
    const { data: session } = useSession();
    const [buttonEnabled, setButtonEnabled] = useState(false)
    const [content, setContent] = useState("")
    const router = useRouter()

    if (!session) {
        return <></>
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        
        const error = await createPost({ content })
        if (error) {
            alert(error) //todo: replace with a toast xD
        }

        window.location.reload() // no hacer esto lollllll !!!
    }

    const handleChange = (event: any) => {
        const content = event.target.value
        setContent(content)
        if (content.length > 0) {
            setButtonEnabled(true)
        } else {
            setButtonEnabled(false)
        }
    }
    
    return (
        <section className="flex-start flex bg-gray-800 border-2 border-dashed rounded-lg border-gray-700">
           <Avatar user={session.dbUser} width={64} height={64} alt="user photo" classNames="h-full pt-4 pl-3 rounded"/>
           <form onSubmit={handleSubmit} className="h-auto w-1/2">
                <textarea 
                    onChange={handleChange}
                    name="compose"
                    id="compose-tweet"
                    placeholder="Escribe algo... ✍️🤓"
                    className="h-full w-full resize-none text-xl p-4 border-none bg-gray-800 outline-none scrollbar-thumb-sky-500 scrollbar-track-text-sky-700"
                />
            </form>
            {buttonEnabled &&
                <button type="submit" onClick={handleSubmit} className="text-sky-500 hover:text-sky-700 font-bold rounded-full w-1/3">
                    <div className="grid grid-cols-2 items-center">
                        <p>Enviar</p>
                        <LuSendHorizonal />
                    </div>
                </button>
            }
        </section>
    )
}