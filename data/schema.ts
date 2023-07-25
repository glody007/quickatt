import { z } from "zod"

export const organisationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, {
    message: "Name required"
  }),
  city: z.string().min(1, {
    message: "City required"
  }),
  country: z.string().min(1, {
    message: "Country required"
  }),
  address: z.string().optional(),
})

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
  id: z.string().optional(),
  name: z.string().min(1, {
    message: "Nom obligatoire"
  }),
  date: z.coerce.date(),
  image: z.string(),
})

export const scheduleSchema = z.object({
  id: z.string().optional(),
  day: z.string(),
  activity: z.enum(["work", "holiday", "break"]),
  startTime: z.string(),
  endTime: z.string()
})

export type Agent = z.infer<typeof agentSchema>

export type Visit = z.infer<typeof visitSchema>

export type Holiday = z.infer<typeof holidaySchema>

export type Schedule = z.infer<typeof scheduleSchema>

export type Organisation = z.infer<typeof organisationSchema>