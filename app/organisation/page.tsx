import { Metadata } from "next"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import LogoutButton from "@/components/logoutButton"
import { CreateOrganisationCard } from "@/components/createOrganisationCard"


export const metadata: Metadata = {
  title: "Organisation",
  description: "Create your organisation.",
}

export default async function AccessPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  } 

  if (session.user.organisationId) {
    redirect("/dashboard");
  } 

  return (
    <div className="flex flex-col h-screen w-full">
        <div className="container flex justify-center sm:justify-between pt-3">
            <Link href="/access" className="text-4xl font-semibold">
                <span className="w-4 h-6 bg-green-400 rounded-xl text-white">Quick</span>att
            </Link>
            <LogoutButton />
        </div>
        <div className="h-full w-full flex justify-center items-center">
            <CreateOrganisationCard />
        </div>
    </div>
  )
}