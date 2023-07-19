import { z } from "zod"

export const agentSchema = z.object({
  id: z.string(),
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

export type Agent = z.infer<typeof agentSchema>

export type Visit = z.infer<typeof visitSchema>

export type Holiday = z.infer<typeof holidaySchema>