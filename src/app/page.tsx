import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "./components/form/login-form";

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  return {
    props: {
      session: await getSession(ctx)
    }
  }
}

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (<LoginForm />)
  }

  return (<h1>Que haces aqui? O.o</h1>)
}
