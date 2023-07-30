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
        startDate: format(addDays(new Date(), -7), "yyyy-MM-dd"),
        endDate: format(new Date(), "yyyy-MM-dd")
    },
    selectRange: (range: Range) => set((state) => ({ range }))
}))