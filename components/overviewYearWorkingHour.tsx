"use client"

import { dayWorkingHoursSchema } from "@/data/schema"
import { formatDateYMD } from "@/lib/utils"
import axios from "axios"
import { addDays, format, isAfter, isBefore } from "date-fns"
import { useQuery } from "react-query"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { z } from "zod"
import Loading from "./loading"

export function OverviewYearWorkingHour() {
  const startDate = formatDateYMD(addDays(new Date(), -6))
  const endDate = formatDateYMD(new Date())

  const { data: response, error, isLoading } = useQuery({
      queryFn: async () => {
        const response = await axios.get(`/api/working?startDate=${startDate}&endDate=${endDate}`)
        return response.data
      },
      queryKey: ["working"]
  })

  if(error) return <>Error</>

  if(isLoading) return <Loading />

  const daysWorkingHours = z.array(dayWorkingHoursSchema).parse(response.data.daysWorkingHours)
  const data = daysWorkingHours.sort((a, b) => {
    if(isBefore(a.day, b.day)) return -1
    if(isAfter(a.day, b.day)) return 1
    return 0
  }).map((data) => ({
    name: format(data.day, "PPP"),
    value: data.hours
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} H`}
        />
        <Bar dataKey="value" fill="#4ade80" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}