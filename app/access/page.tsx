import { Separator } from "@/components/ui/separator"
import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import { z } from "zod"
import { visitSchema } from "@/data/schema"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import Link from "next/link"
import { AccessCard } from "@/components/accessCard"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Schedules",
  description: "A schedule tracker using Tanstack Table.",
}


// Simulate a database read for visits.
async function getVisits() {
    const data = await fs.readFile(
      path.join(process.cwd(), "data/visits.json")
    )
  
    const agents = JSON.parse(data.toString())
  
    return z.array(visitSchema).parse(agents)
}

export default async function AccessPage() {
  const visits = await getVisits()

  return (
    <div className="flex h-screen w-full">
        <div className="flex-[0.6] flex flex-col space-y-4 h-screen">
            <div className="sticky top-0 bg-slate-100">
                <div className="flex items-center justify-between space-y-2 px-4 py-4">
                    <h2 className="text-3xl text-slate-900 font-extrabold tracking-tight">Access list</h2>
                    <Link href="/dashboard">
                        <Button size="sm">Dashboard</Button>
                    </Link>
                </div>
                <Separator />
            </div>
            <div className="h-full overflow-scroll px-4 pb-36">
                <DataTable data={visits} columns={columns} />
            </div>
        </div>
        <div className="flex-[0.4] h-full flex pt-16 border-l bg-slate-900">
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