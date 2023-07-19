import { cn } from "@/lib/utils";
import { HtmlHTMLAttributes } from "react";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
    
}

const getHourFromIndex = (index: number) => {
    const pos = index + 1
    const hour = pos % 12
    if(pos === 12) return `12 AM`
    if(index < 12) return `${hour} AM`
    return `${hour} PM`
}

const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const hours = Array.from({ length: 16 }, (value, index) =>  getHourFromIndex(index));

const HOUR_SUBS = 1
const GRID_ROWS = hours.length * HOUR_SUBS
const GRID_COLUMNS = days.length

const scheduleData = [
    {
        day: "wed",
        activity: "work",
        startTime: "8",
        endTime: "12"
    },
    {
        day: "wed",
        activity: "work",
        startTime: "13",
        endTime: "17"
    },
    {
        day: "wed",
        activity: "break",
        startTime: "12",
        endTime: "13"
    },
]

const getColumnFromDay = (day: string) => {
    return days.indexOf(day)
}

const getRowFromTime = (hour: string) => {
    return 6
}

export default function Schedule({ className }: Props) {

    return (
        <div className={cn(
            "flex flex-col",
            className
        )}>
            <div className="sticky top-0 grid grid-cols-7 place-items-center bg-white">
                {days.map((day, idx) => {
                    return (
                        <div key={idx} className={cn(
                            "w-full flex justify-center border-b pt-6 pb-1",
                            {"border-b-2 border-b-green-400" : idx === 3}
                        )}>
                            <div key={idx} className="text-xs">
                                {day.toLocaleUpperCase()}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={cn(
                `grid grid-cols-${GRID_COLUMNS} grid-row-16 place-items-center`,
                "h-full overflow-scroll pb-32"
            )}>
                {hours.map((hour, rowIdx) => {
                    return (
                        <>
                            {days.map((day, colIdx) => {
                                return (
                                    <div 
                                        key={colIdx} 
                                        className={cn(
                                            "w-full flex justify-center border-b py-6",
                                            `col-start-${colIdx + 1} col-span-1`, // Column start at one and span one col
                                            `row-start-${rowIdx + 1} row-span-1`, // row start at one and span one row
                                            {"border-r": colIdx !== GRID_COLUMNS - 1} // No border to the last column
                                        )}
                                    >
                                        <div className="text-xs">
                                            {hour}
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    )
                })}
                {scheduleData.map((schedule, idx) => (
                    <div 
                        key={idx} 
                        className={cn(
                            "w-full h-full flex justify-center border-b p-1",
                            `col-start-2 col-span-1`, // Span one col
                            `row-start-2 row-span-1`,
                        )}
                    >
                        <div className="w-full flex justify-center rounded-lg py-4 m-1 bg-blue-300">
                            <div className="text-xs">
                                {schedule.activity}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}