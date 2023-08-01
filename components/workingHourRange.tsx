"use client"

import { analyticsSchema, dayWorkingHoursSchema } from '@/data/schema';
import { useAnalyticRange } from '@/store/useAnalyticRange';
import axios from 'axios';
import { format, isAfter, isBefore } from 'date-fns';
import { useQuery } from 'react-query';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { z } from 'zod';
import Loading from './loading';

export function WorkingHourRange() {
  const { range } = useAnalyticRange()
  const { data: response, error, isLoading } = useQuery({
    queryFn: async () => {
      const response = await axios.get(`/api/working?startDate=${range.startDate}&endDate=${range.endDate}`)
      return response.data
    },
    queryKey: ["working-hour", range]
  })

  if(error) return <>Error</>

  if(isLoading) return <Loading />

  const daysWorkingHours = z.array(dayWorkingHoursSchema).parse(response.data.daysWorkingHours)
  const data = daysWorkingHours.sort((a, b) => {
    if(isBefore(a.day, b.day)) return -1
    if(isAfter(a.day, b.day)) return 1
    return 0
  }).map((data) => ({
    name: format(data.day, "dd MMM"),
    value: data.hours
  }))

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
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
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#4ade80" fill="#4ade80" />
      </AreaChart>
    </ResponsiveContainer>
  );
}