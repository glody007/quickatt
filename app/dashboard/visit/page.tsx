import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import { z } from "zod"

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { visitSchema } from "@/data/schema"

export const metadata: Metadata = {
  title: "Visits",
  description: "A visit tracker using Tanstack Table.",
}

// Simulate a database read for visits.
async function getVisits() {
  const data = await fs.readFile(
    path.join(process.cwd(), "data/visits.json")
  )

  const agents = JSON.parse(data.toString())

  return z.array(visitSchema).parse(agents)
}

export default async function VisitPage() {
  const visits = await getVisits()

  return (
    <>
        <div className="w-full bg-slate-900 h-40">
        </div>
        <div className="container h-full flex-1 flex-col space-y-8 p-8 md:flex -mt-40">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl text-slate-300 font-bold tracking-tight">
                        Agents
                    </h2>
                    <p className="text-muted-foreground">
                        Here&apos;s the list of agents
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    
                </div>
            </div>
            <DataTable data={visits} columns={columns} />
        </div>
    </>
  )
}