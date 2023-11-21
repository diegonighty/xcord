import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/app/components/form/register-form";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Register() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return <RegisterForm />;
}