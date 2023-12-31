import { Schedule } from "@/data/schema"
import { type ClassValue, clsx } from "clsx"
import { format, isBefore } from "date-fns"
import { twMerge } from "tailwind-merge"
 
export const QUICKATT_LAUNCH_DAY = new Date(2023, 6, 20)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export function convertTimeStringToMinute(time: String) {
  const [hours, minutes] = time.split(":")
  return parseInt(hours) * 60 + parseInt(minutes)
}

export function areSchedulesOverlapping(scheduleA: Schedule, scheduleB: Schedule) {
  const startMinutesA = convertTimeStringToMinute(scheduleA.startTime)
  const endMinutesA = convertTimeStringToMinute(scheduleA.endTime)
  const startMinutesB = convertTimeStringToMinute(scheduleB.startTime)
  const endMinutesB = convertTimeStringToMinute(scheduleB.endTime)
  if(startMinutesB > startMinutesA && startMinutesB < endMinutesA) return true
  if(endMinutesB > startMinutesA && endMinutesB < endMinutesA) return true
  return false
}

export function formatAccessTime(dateTime: Date) {
  const quickattLaunchDay = QUICKATT_LAUNCH_DAY
  if(isBefore(dateTime, quickattLaunchDay)) return "-"
  return format(dateTime, "HH:mm")
}


export function formatDateYMD(date: Date) {
  return format(date, "yyyy-MM-dd")
}