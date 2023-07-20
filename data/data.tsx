import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
  } from "@radix-ui/react-icons"
import { UserCircle, UserCircle2Icon, AlarmClock, Briefcase, Pizza } from "lucide-react"
  
export const titles = [
    {
      label: "Directeur",
      value: "directeur",
      icon: UserCircle2Icon,
    },
    {
      label: "Normal",
      value: "normal",
      icon: CircleIcon,
    }
]

export const motifs = [
    {
      label: "Rendez-vous",
      value: "rdv",
      icon: AlarmClock,
    },
]

export type activityTypes = "work" | "break" | "holiday"

export const activities = [
  {
    label: "Work",
    value: "work",
    color: "#93c5fd",
    bg: "bg-blue-300",
    icon: Briefcase,
  },
  {
    label: "Break",
    value: "break",
    color: "#86efac",
    bg: "bg-green-300",
    icon: Pizza,
  },
  {
    label: "Holiday",
    value: "holiday",
    color: "#a855f7",
    bg: "bg-purple-500",
    icon: Pizza,
  },
]
