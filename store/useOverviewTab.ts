import { create } from "zustand"

interface Tab {
    name: string
    selectTab: (name: string) => void
}

export const useOverviewTab = create<Tab>((set) => ({
    name: "overview",
    selectTab: (name: string) => set((state) => ({ name: name}))
}))