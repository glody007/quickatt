"use client"

import * as React from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import AgentForm from "./form/agentForm"

const AddAgent = (
    { className }: { className?:string }
) => {
    const [openModal, setOpenModal] = React.useState(false)

    const handleSuccess = () => {
        setOpenModal(false)
    }

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-400">
                    <Plus /> New
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
                <AgentForm onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    )
}
  
export default AddAgent