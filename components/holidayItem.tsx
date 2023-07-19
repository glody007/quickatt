import { Holiday, holidaySchema } from "@/data/schema";
import { HtmlHTMLAttributes } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
    holiday: Holiday
}

export default function HolidayItem({ holiday, className }: Props) {

    return (
        <div className="group flex border cursor-pointer hover:bg-green-50 rounded-lg p-2">
            <div>

            </div>
            <div className="flex-1 flex flex-col gap-1">
                <div className="flex justify-between items-center">
                    <div className="text-sm">
                        {holiday.name}
                    </div>
                    <Button variant="ghost" className="invisible group-hover:visible h-6 p-1">
                        <MoreHorizontal className="w-4" />
                    </Button>
                </div>
                <div className="text-xs text-slate-500">
                    {format(holiday.date, "dd MMM")}
                </div>
            </div>
        </div>
    )
}