import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]/auth";
import LoginForm from "@/components/form/login-form";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (<LoginForm />)
  }

  redirect("/timeline")
}
