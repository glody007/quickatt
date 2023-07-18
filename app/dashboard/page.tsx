import { Metadata } from "next"
import Image from "next/image"

import { Button } from "@/components/ui/button"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/components/ui/calendarDateRangePicker"
import { Overview } from "@/components/overview"
import { Analytics } from "@/components/analytics"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
}

export default function DashboardPage() {
  return (
    <>
      <div className="flex-col md:flex">
        <div className="w-full bg-slate-900 h-60">
        </div>
        <div className="flex-1 container space-y-4 pt-6 -mt-52">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl text-slate-300 font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button className="bg-green-400 hover:bg-green-600">Download</Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">
                Overview
              </TabsTrigger>
              <TabsTrigger value="analytics">
                Analytics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Overview />
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <Analytics />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
