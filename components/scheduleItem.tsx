import { Schedule } from "@/data/schema";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { HtmlHTMLAttributes } from "react";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
    schedule: Schedule
}

const activityColorMap = {
    "work": "bg-blue-300",
    "break": "bg-green-300",
    "holiday": "bg-purple-300"
}

const activityEmojiMap = {
    "work": "💼",
    "break": "🥘",
    "holiday": "🩴"
}

export default function ScheduleItem({ schedule, className }: Props) {

    return (
        <div className={cn(
            "w-[96%] h-[99%] flex flex-col items-center rounded-lg gap-2 py-4",
            activityColorMap[schedule.activity]
        )}>
            <div className="text-xs">
                {activityEmojiMap[schedule.activity]} {schedule.activity}
            </div>
            <div className="text-xs text-slate-600">
                {schedule.startTime}-{schedule.endTime}
            </div>
        </div>
    )
}