"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Eye } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { CalendarDateRangePicker } from "@/components/ui/calendarDateRangePicker"
import UserInfo from "@/components/userInfo"
import AgentList from "./agentList"
import { useAgent } from "@/store/useAgent"
import { useEffect, useState } from "react"
import { UserDateRangePicker } from "@/components/userDateRangePicker"

export function UserDetailsSheet() {
  const { agent } = useAgent()
  const [openSheet, setOpenSheet] = useState(false)

  useEffect(() => {
    if(agent.name !== "") setOpenSheet(true)
  }, [agent])

  return (
    <div className="flex items-center">
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent className="min-w-[1200px] p-0">
          <div className="flex">
            <div className="min-w-[500px] flex flex-col space-y-4">
              <div className="px-4 pt-4"> 
                <SheetHeader>
                  <div className="flex justify-between items-end">
                    <h2 className="text-2xl text-green-500 font-bold">{agent.name}</h2>
                    <UserDateRangePicker />
                  </div>
                </SheetHeader>
              </div>
              <Separator />
              <div className="px-4">
                <UserInfo agent={agent} />
              </div>
            </div>
            <div className="w-[700px] flex flex-col space-y-4 bg-slate-100 h-screen overflow-scroll border-l p-4">
              <SheetHeader>
                <SheetTitle>Employee worked</SheetTitle>
                <SheetDescription>
                  Select a employee for more details.
                </SheetDescription>
              </SheetHeader>
              <AgentList />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}