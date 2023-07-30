import { formatDateYMD } from "@/lib/utils"
import { create } from "zustand"

interface AccessDate {
    date: string
    selectDate: (date: string) => void
}

export const useAccessDate = create<AccessDate>((set) => ({
    date: formatDateYMD(new Date()),
    selectDate: (date: string) => set((state) => ({ date }))
}))