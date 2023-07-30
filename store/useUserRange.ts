import { formatDateYMD } from "@/lib/utils"
import { addDays, format } from "date-fns"
import { create } from "zustand"

interface Range { 
    startDate: string, 
    endDate: string
}

interface UserRange {
    range: Range
    selectRange: (range: Range) => void
}

export const useUserRange = create<UserRange>((set) => ({
    range: {
        startDate: formatDateYMD(addDays(new Date(), -7)),
        endDate: formatDateYMD(new Date())
    },
    selectRange: (range: Range) => set((state) => ({ range }))
}))