import { formatDateYMD } from "@/lib/utils"
import { create } from "zustand"

interface VisitDate {
    date: string
    selectDate: (date: string) => void
}

export const useVisitDate = create<VisitDate>((set) => ({
    date: formatDateYMD(new Date()),
    selectDate: (date: string) => set((state) => ({ date }))
}))