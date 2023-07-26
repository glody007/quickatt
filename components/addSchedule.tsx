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
import ScheduleForm from "./form/scheduleForm"

const AddSchedule = (
    { className }: { className?:string }
) => {
    const [openModal, setOpenModal] = React.useState(false)

    const handleSuccess = () => {
        setOpenModal(false)
    }

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
                <Button className="h-6 p-1 bg-green-600 hover:bg-green-400">
                    <Plus className="w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
                <ScheduleForm onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    )
}
  
export default AddSchedule