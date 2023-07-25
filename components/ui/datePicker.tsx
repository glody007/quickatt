"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SelectSingleEventHandler } from "react-day-picker"

export type DatePickerProps = {
  showYear?: Boolean,
  className?: string,
  selected?: Date
  onSelect?: (date: Date) => void
}

export function DatePicker({
  showYear = true, 
  selected,
  onSelect,
  className
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(selected)

  const formatDate = (date: Date) => {
      if(showYear) return format(date, "PPP")
      return format(date, "dd MMM")
  }
  
  const handleSelect = (date?: Date) => {
    setDate(date)
    if(onSelect && date) onSelect(date)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] h-8 justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? formatDate(date) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          initialFocus
          showYear={showYear}
        />
      </PopoverContent>
    </Popover>
  )
}
