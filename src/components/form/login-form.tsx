"use client";
import Link from "next/link";
import { FormEvent, FormEventHandler, useState } from "react";
import { logIn } from "@/app/lib/manager/user.manager";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> | undefined = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const error = await logIn({ email, password })
      if (error) {
        setError("Credenciales incorrectas.");
        return;
      }

      router.push("/timeline");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center pt-10">
      <div className="bg-black shadow-lg p-5 rounded-lg border-t-4 border-black">
        <h1 className="text-xl font-bold my-4">Iniciar Sesión 🔐</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold cursor-pointer px-6 py-2">
            Iniciar Sesión
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2 mr-5 ">
              <p>{error}</p>
            </div>
          )}

          <p className="text-sm mt-3 text-right">
            ¿No tienes cuenta?, <Link href={"/register"}><span className="underline">¡Crea una!</span></Link>
          </p>
        </form>
      </div>
    </div>
  );
}