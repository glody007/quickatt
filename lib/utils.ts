import { Schedule } from "@/data/schema"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
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
