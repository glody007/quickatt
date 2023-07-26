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
import HolidayForm from "./form/holidayForm"

const AddHoliday = (
    { className }: { className?:string }
) => {
    const [openModal, setOpenModal] = React.useState(false)

    const handleSuccess = () => {
        setOpenModal(false)
    }

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="h-6 p-1">
                    <Plus className="w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
                <HolidayForm onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    )
}
  
export default AddHoliday