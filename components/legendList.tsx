import { activities } from "@/data/data";
import { cn } from "@/lib/utils";
import { HtmlHTMLAttributes } from "react";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
    
}

export default function LegendList({ className }: Props) {
    return (
        <div className={cn(
            "flex flex-col items-start gap-4",
            className
        )}>
            <p className="text-sm text-slate-700">Legende</p>
            <div className="flex flex-col gap-2">
                {activities.map(activity => (
                    <div key={activity.value} className="flex items-center gap-2">
                        <div className={cn(
                            "h-2 w-2 rounded-xs bg-[#93c5fd] bg-[#86efac] bg-[#a855f7]", 
                            `bg-[${activity.color}]`
                        )} />
                        <p className="text-xs">{activity.label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}