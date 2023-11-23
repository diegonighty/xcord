"use client";
import Link from "next/link";
import { FormEvent, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/app/lib/manager/user.manager";

export function RegisterForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("")
    const [error, setError] = useState("")

    const router = useRouter()

    const handleSubmit: FormEventHandler<HTMLFormElement> | undefined = async (event: FormEvent) => {
        event.preventDefault();

        if (!name || !email || !password) {
            setError("Por favor, rellene todos los campos.")
            return
        }

        try {
            const error = await register({ name, email, password, avatarUrl })
            if (!error) {
              router.push("/")
            } else {
              setError(error)
            }
        } catch (error) {
            setError("Ha ocurrido un error.")
            console.error(error)
        }
    }

    return (
    <div className="grid place-items-center pt-10">
      <div className="bg-black shadow-lg p-5 rounded-lg border-t-4 border-black">
        <h1 className="text-xl font-bold my-4">Crea tu cuenta 💫</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Usuario"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Correo"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Contraseña"
          />
         <input
            onChange={(e) => setAvatarUrl(e.target.value)}
            type="url"
            placeholder="Avatar (imgur link) (opcional) https://i.imgur.com/KnSH06R.png"
          />
          <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold cursor-pointer px-6 py-2">
            Crear cuenta
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2 mr-5 ">
              <p>{error}</p>
            </div>
          )}

          <p className="text-sm mt-3 text-right">
            Ya tienes una cuenta? <Link className="text-sm mt-3 text-right" href="/"><span className="underline">Inicia Sesión</span></Link>
          </p>
        </form>
      </div>
    </div>
  );
}