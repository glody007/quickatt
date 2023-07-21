import HolidayHeader from "@/components/holidayHeader"
import HolidayList from "@/components/holidayList"
import LegendList from "@/components/legendList"
import Schedule from "@/components/schedule"
import ScheduleHeader from "@/components/scheduleHeader"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Schedules",
  description: "A schedule tracker using Tanstack Table.",
}

export default async function SchedulePage() {
  

  return (
    <div className="flex h-screen w-full">
        <div className="h-full bg-slate-50 border-r">
            <Calendar />
            <Separator />
            <LegendList className="p-4" />
        </div>
        <div className="flex-1 h-full">
            <ScheduleHeader className="px-4 py-2" />
            <Schedule className="w-full h-full" />
        </div>
        <div className="flex-[0.3] h-full border-l">
            <HolidayHeader className="px-4 py-2" />
            <Separator />
            <div className="sticky overflow-scroll h-full pb-32">
                {/* @ts-expect-error Server Component */}
                <HolidayList className="p-4" />
            </div>
        </div>
    </div>
  )
}