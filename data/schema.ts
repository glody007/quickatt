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
  name: z.string().min(1, {
    message: "Nom obligatoire"
  }),
  email: z.string(),
  number: z.string().min(1, {
    message: "Numero obligatoire"
  }),
  title: z.string(),
})

export const visitSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, {
      message: "Nom obligatoire"
    }),
    email: z.string()
            .nullable()
            .optional()
            .transform((value) => value ?? ""),
    number: z.string().min(1, {
      message: "Numero obligatoire"
    }),
    motif: z.string().min(1, {
      message: "Motif obligatoire"
    }),
    entryTime: z.coerce.date().optional(),
    exitTime: z.coerce.date().optional(),
})

export const accessSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, {
    message: "Nom obligatoire"
  }),
  email: z.string()
          .nullable()
          .optional()
          .transform((value) => value ?? ""),
  number: z.string().min(1, {
    message: "Numero obligatoire"
  }),
  type: z.string().min(1, {
    message: "Type obligatoire"
  }),
  entryTime: z.coerce.date().optional(),
  exitTime: z.coerce.date().optional(),
})

export const dayWorkingHoursSchema = z.object({
  day: z.coerce.date(),
  hours: z.number()
})

export const dayAttendancesSchema = z.object({
  day: z.coerce.date(),
  attendances: z.number()
})

export const analyticsSchema = z.object({
  totalAgent: z.number(),
  attendances: z.number(),
  absences: z.number(),
  attendancesForWorkingDays: z.number(),
  visits: z.number(),
  workingHours: z.number(),
  workingDays: z.number(),
  attendancesRatio: z.number(),
  absencesRatio: z.number(),
  workingHoursVolume: z.number(),
  workingHoursRatio: z.number()
})

export const agentCredentialSchema = z.object({
  pin: z.string().min(1, {
    message: "Pin obligatoire"
  })
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
  day: z.enum(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]),
  activity: z.enum(["work", "holiday", "break"]),
  startTime: z.string().min(1, {
    message: "Start time obligatoire"
  }),
  endTime: z.string().min(1, {
    message: "End time obligatoire"
  }),
  timeZone: z.string(),
})

export type Agent = z.infer<typeof agentSchema>

export type Visit = z.infer<typeof visitSchema>

export type Holiday = z.infer<typeof holidaySchema>

export type Schedule = z.infer<typeof scheduleSchema>

export type Organisation = z.infer<typeof organisationSchema>

export type AgentCredential = z.infer<typeof agentCredentialSchema>

export type Access = z.infer<typeof accessSchema>

export type Analytics = z.infer<typeof analyticsSchema>