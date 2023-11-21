import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "./components/form/login-form";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (<LoginForm />)
  }

  return (
    <section>

    </section>
  )
}
