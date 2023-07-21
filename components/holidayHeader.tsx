import { cn } from "@/lib/utils";
import { MoreHorizontal, Plus } from "lucide-react";
import { HtmlHTMLAttributes } from "react";
import AddHoliday from "./addHoliday";
import { Button } from "./ui/button";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
    
}

export default function HolidayHeader({ className }: Props) {
    return (
        <div className={cn(
            "flex justify-between items-center",
            className
        )}>
            <p className="text-lg font-bold text-slate-700">
                Holiday
            </p>
            <div className="flex items-center">
                <AddHoliday />
                <Button variant="ghost" className="h-6 p-1">
                    <MoreHorizontal className="w-4" />
                </Button>
            </div>
        </div>
    )
}