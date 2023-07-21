import { z } from "zod"
import { activities } from "./data"

export const agentSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  number: z.string(),
  title: z.string(),
})

export const visitSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    number: z.string(),
    motif: z.string(),
    entryTime: z.coerce.date(),
    exitTime: z.coerce.date(),
})

export const holidaySchema = z.object({
  id: z.string(),
  name: z.string(),
  date: z.coerce.date(),
  image: z.string(),
})

export const scheduleSchema = z.object({
  id: z.string(),
  day: z.string(),
  activity: z.enum(["work", "holiday", "break"]),
  startTime: z.string(),
  endTime: z.string()
})

export type Agent = z.infer<typeof agentSchema>

export type Visit = z.infer<typeof visitSchema>

export type Holiday = z.infer<typeof holidaySchema>

export type Schedule = z.infer<typeof scheduleSchema>