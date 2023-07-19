import { holidaySchema } from "@/data/schema";
import { cn } from "@/lib/utils";
import { promises as fs } from "fs"
import path from "path"
import { z } from "zod"
import { HtmlHTMLAttributes } from "react";
import HolidayItem from "./holidayItem";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
    
}

// Simulate a database read for holidays.
async function getHolidays() {
    const data = await fs.readFile(
      path.join(process.cwd(), "data/holidays.json")
    )
  
    const holidays = JSON.parse(data.toString())
  
    return z.array(holidaySchema).parse(holidays)
  }

export default async function HolidayList({ className }: Props) {
    const holidays = await getHolidays()

    return (
        <div className={cn(
            "flex flex-col gap-4",
            className
        )}>
            <div className="flex flex-col gap-2">
                {holidays.map(holiday => (
                    <HolidayItem key={holiday.id} holiday={holiday} />
                ))}
            </div>
        </div>
    )
}