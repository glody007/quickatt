"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "16 Jan",
    total: Math.floor(Math.random() * 45),
  },
  {
    name: "17 Jan",
    total: Math.floor(Math.random() * 45),
  },
  {
    name: "18 Jan",
    total: Math.floor(Math.random() * 45),
  },
  {
    name: "19 Jan",
    total: Math.floor(Math.random() * 45),
  },
  {
    name: "20 Jan",
    total: Math.floor(Math.random() * 45),
  },
  {
    name: "22 Jan",
    total: Math.floor(Math.random() * 45),
  },
  {
    name: "23 Jan",
    total: Math.floor(Math.random() * 45),
  },
  {
    name: "45 Jan",
    total: Math.floor(Math.random() * 45),
  },
  {
    name: "25 Jan",
    total: Math.floor(Math.random() * 45),
  },
  {
    name: "26 Jan",
    total: Math.floor(Math.random() * 45),
  },
  {
    name: "27 Jan",
    total: Math.floor(Math.random() * 45),
  },
  {
    name: "28 Jan",
    total: Math.floor(Math.random() * 45),
  },
]

export function AttendanceRange() {
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
        <Bar dataKey="total" fill="#4ade80" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}