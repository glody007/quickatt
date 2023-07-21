import { cn } from "@/lib/utils";
import { HtmlHTMLAttributes } from "react";
import AddSchedule from "./addSchedule";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
    
}

export default function ScheduleHeader({ className }: Props) {
    return (
        <div className={cn(
            "flex justify-between items-center",
            className
        )}>
            <p className="text-xl font-extrabold text-slate-700">
                Horaire
            </p>
            <div className="flex items-center">
                <AddSchedule />
            </div>
        </div>
    )
}