"use client"

import { analyticsSchema, dayAttendancesSchema } from "@/data/schema"
import { useAnalyticRange } from "@/store/useAnalyticRange"
import axios from "axios"
import { format, isAfter, isBefore } from "date-fns"
import { useQuery } from "react-query"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { z } from "zod"
import Loading from "./loading"

export function AttendanceRange() {
  const { range } = useAnalyticRange()
  const { data: response, error, isLoading } = useQuery({
    queryFn: async () => {
      const response = await axios.get(`/api/working?startDate=${range.startDate}&endDate=${range.endDate}`)
      return response.data
    },
    queryKey: ["analytics-attendance", range]
  })

  if(error) return <>Error</>

  if(isLoading) return <Loading />

  const daysAttendances = z.array(dayAttendancesSchema).parse(response.data.daysAttendances)
  const data = daysAttendances.sort((a, b) => {
    if(isBefore(a.day, b.day)) return -1
    if(isAfter(a.day, b.day)) return 1
    return 0
  }).map((data) => ({
    name: format(data.day, "dd MMM"),
    value: data.attendances 
  }))

  return (
    <ResponsiveContainer width="100%" height={350}>
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
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="value" fill="#4ade80" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}