import { formatDateYMD } from "@/lib/utils"
import { addDays, format } from "date-fns"
import { create } from "zustand"

interface Range { 
    startDate: string, 
    endDate: string
}

interface AnalyticRange {
    range: Range
    selectRange: (range: Range) => void
}

export const useAnalyticRange = create<AnalyticRange>((set) => ({
    range: {
        startDate: formatDateYMD(addDays(new Date(), -7)),
        endDate: formatDateYMD(new Date())
    },
    selectRange: (range: Range) => set((state) => ({ range }))
}))