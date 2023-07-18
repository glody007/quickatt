import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { columns } from "@/components/table/columns"
import { DataTable } from "@/components/table/data-table"
import { agentSchema } from "@/data/schema"

export const metadata: Metadata = {
  title: "Agents",
  description: "A agent tracker using Tanstack Table.",
}

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "data/agents.json")
  )

  const agents = JSON.parse(data.toString())

  return z.array(agentSchema).parse(agents)
}

export default async function AgentPage() {
  const agents = await getTasks()

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of agents
            </p>
          </div>
          <div className="flex items-center space-x-2">
            
          </div>
        </div>
        <DataTable data={agents} columns={columns} />
      </div>
    </>
  )
}