"use client"

import * as React from "react"
import { DatePicker } from "@/components/ui/datePicker"
import { formatDateYMD } from "@/lib/utils"
import { useVisitDate } from "@/store/useVisitDate"

export default function VisitDatePicker() {
    const { date, selectDate } = useVisitDate()

    const handleSelect = (date: Date) => {
        selectDate(formatDateYMD(date))
    }

    return (
        <DatePicker selected={new Date(date)} onSelect={handleSelect} />
    )
}