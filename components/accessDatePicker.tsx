"use client"

import * as React from "react"
import { DatePicker } from "@/components/ui/datePicker"
import { useAccessDate } from "@/store/useAccessDate"
import { formatDateYMD } from "@/lib/utils"

export default function AccessDatePicker() {
    const { date, selectDate } = useAccessDate()

    const handleSelect = (date: Date) => {
        selectDate(formatDateYMD(date))
    }

    return (
        <DatePicker selected={new Date(date)} onSelect={handleSelect} />
    )
}