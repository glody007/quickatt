import { activities } from "@/data/data";
import { Schedule } from "@/data/schema";
import { cn } from "@/lib/utils";
import { HtmlHTMLAttributes } from "react";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
    title: string,
    info: string
}

export default function UserInfoOverviewCard({ title, info, className }: Props) {

    return (
        <div className={cn(
            "flex flex-col space-y-2",
            className
        )}>
            <div className="w-8 h-1 bg-green-500" />
            <div>
                <div className="text-xs text-slate-500">{title}</div>
                <div className="text-md">{info}</div>
            </div>
        </div>
    )
}