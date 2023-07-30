"use client"

import { useOverviewTab } from "@/store/useOverviewTab";
import { HtmlHTMLAttributes } from "react";
import { Button } from "./ui/button";
import { CalendarDateRangePicker } from "./ui/calendarDateRangePicker";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
    
}

export default function StatHeader({ className }: Props) {
    const { name } = useOverviewTab()

    return (
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl text-slate-300 font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
            {name === "analytics" && <CalendarDateRangePicker />}
            <Button className="bg-green-600 hover:bg-green-400">Download</Button>
            </div>
        </div>
    )
}