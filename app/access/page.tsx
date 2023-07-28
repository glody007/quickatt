import { Separator } from "@/components/ui/separator"
import { Metadata } from "next"
import Link from "next/link"
import { AccessCard } from "@/components/accessCard"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import LogoutButton from "@/components/logoutButton"
import AccessList from "./accessList"


export const metadata: Metadata = {
  title: "Schedules",
  description: "A schedule tracker using Tanstack Table.",
}

export default async function AccessPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  } 

  return (
    <div className="flex h-screen w-full">
        <div className="flex-[0.6] flex flex-col space-y-4 h-screen">
            <div className="sticky top-0 bg-slate-100">
                <div className="flex items-center justify-between space-y-2 px-4 py-4">
                    <h2 className="text-3xl text-slate-900 font-extrabold tracking-tight">Access list</h2>
                    <div className="flex gap-2">
                        <Link href="/dashboard">
                            <Button size="sm">Dashboard</Button>
                        </Link>
                        <LogoutButton />
                    </div>
                </div>
                <Separator />
            </div>
            <div className="h-full overflow-scroll px-4 pt-2 pb-36">
                <AccessList />
            </div>
        </div>
        <div className="flex-[0.4] h-full flex pt-4 border-l bg-slate-900">
            <div className="w-full flex flex-col items-center space-y-10">
                <Link href="/access" className="text-4xl font-semibold text-white">
                    <span className="w-4 h-6 bg-green-400 rounded-xl">Quick</span>att
                </Link>
                <AccessCard />
            </div>
        </div>
    </div>
  )
}