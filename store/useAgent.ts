import { Agent } from "@/data/schema"
import { create } from "zustand"

interface AgentSelection {
    agent: Agent
    selectAgent: (agent: Agent) => void
}

export const useAgent = create<AgentSelection>((set) => ({
    agent: {
        number: "",
        name: "",
        email: "",
        title: ""
    },
    selectAgent: (agent: Agent) => set((state) => ({ agent }))
}))