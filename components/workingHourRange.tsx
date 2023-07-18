"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '16 jan',
    hours: 400,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '17 jan',
    hours: 300,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '18 jan',
    hours: 200,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '19 jan',
    hours: 278,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '21 jan',
    hours: 189,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '22 jan',
    hours: 239,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '23 jan',
    hours: 349,
    pv: 4300,
    amt: 2100,
  },
];

export function WorkingHourRange() {
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
        <Area type="monotone" dataKey="hours" stroke="#4ade80" fill="#4ade80" />
      </AreaChart>
    </ResponsiveContainer>
  );
}