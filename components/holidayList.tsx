"use client"

import { cn } from "@/lib/utils";
import { HtmlHTMLAttributes } from "react";
import HolidayItem from "./holidayItem";
import { useQuery } from "react-query";
import axios from "axios";
import { Holiday, holidaySchema } from "@/data/schema";
import { z } from "zod";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
    
}

export default function HolidayList({ className }: Props) {

    const { data: response, error, isLoading } = useQuery({
        queryFn: async () => {
           const response = await axios.get("/api/holidays")
           return response.data
        },
        queryKey: ["holidays"]
    })

    if(error) return <>Error</>

    if(isLoading) return <>Loading...</>

    const holidays = z.array(holidaySchema).parse(response.data)

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