import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { RegisterForm } from "@/components/form/register-form";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return <RegisterForm />;
}