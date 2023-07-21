import { activities } from "@/data/data";
import { Schedule } from "@/data/schema";
import { cn } from "@/lib/utils";
import { HtmlHTMLAttributes } from "react";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
    
}

const getHourFromIndex = (index: number) => {
    const hour = index % 12
    if(index === 12) return `12 AM`
    if(index < 12) return `${hour} AM`
    return `${hour} PM`
}

const days = ["", "mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const hours = Array.from({ length: 24  }, (value, index) =>  getHourFromIndex(index));

const HOUR_SUBS = 6
const GRID_ROWS = hours.length * HOUR_SUBS
const GRID_COLUMNS = days.length

const scheduleData: Array<Schedule> = [
    {
        id: "1",
        day: "wed",
        activity: "work",
        startTime: "1",
        endTime: "5"
    },
    {
        id: "2",
        day: "mon",
        activity: "break",
        startTime: "5",
        endTime: "6"
    },
    {
        id: "3",
        day: "fri",
        activity: "work",
        startTime: "6",
        endTime: "10"
    },
]

const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
    "col-start-8",
];

const rowStartClasses = [
    "","row-start-2","row-start-3","row-start-4","row-start-5","row-start-6","row-start-7","row-start-8","row-start-9","row-start-10","row-start-11","row-start-12","row-start-13","row-start-14","row-start-15","row-start-16","row-start-17","row-start-18","row-start-19","row-start-20","row-start-21","row-start-22","row-start-23","row-start-24","row-start-25","row-start-26","row-start-27","row-start-28","row-start-29","row-start-30","row-start-31","row-start-32","row-start-33","row-start-34","row-start-35","row-start-36","row-start-37","row-start-38","row-start-39","row-start-40","row-start-41","row-start-42","row-start-43","row-start-44","row-start-45","row-start-46","row-start-47","row-start-48","row-start-49","row-start-50","row-start-51","row-start-52","row-start-53","row-start-54","row-start-55","row-start-56","row-start-57","row-start-58","row-start-59","row-start-60","row-start-61","row-start-62","row-start-63","row-start-64","row-start-65","row-start-66","row-start-67","row-start-68","row-start-69","row-start-70","row-start-71","row-start-72","row-start-73","row-start-74","row-start-75","row-start-76","row-start-77","row-start-78","row-start-79","row-start-80","row-start-81","row-start-82","row-start-83","row-start-84","row-start-85","row-start-86","row-start-87","row-start-88","row-start-89","row-start-90","row-start-91","row-start-92","row-start-93","row-start-94","row-start-95","row-start-96","row-start-97","row-start-98","row-start-99","row-start-100","row-start-101","row-start-102","row-start-103","row-start-104","row-start-105","row-start-106","row-start-107","row-start-108","row-start-109","row-start-110","row-start-111","row-start-112","row-start-113","row-start-114","row-start-115","row-start-116","row-start-117","row-start-118","row-start-119","row-start-120","row-start-121","row-start-122","row-start-123","row-start-124","row-start-125","row-start-126","row-start-127","row-start-128","row-start-129","row-start-130","row-start-131","row-start-132","row-start-133","row-start-134","row-start-135","row-start-136","row-start-137","row-start-138","row-start-139","row-start-140","row-start-141","row-start-142","row-start-143"
];

const rowSpanClasses = [
    "row-span-1", "row-span-2", "row-span-3", "row-span-4", "row-span-5", "row-span-6", "row-span-7", "row-span-8", "row-span-9", "row-span-10", "row-span-11", "row-span-12", "row-span-13", "row-span-14", "row-span-15", "row-span-16", "row-span-17", "row-span-18", "row-span-19", "row-span-20", "row-span-21", "row-span-22", "row-span-23", "row-span-24", "row-span-25", "row-span-26", "row-span-27", "row-span-28", "row-span-29", "row-span-30", "row-span-31", "row-span-32", "row-span-33", "row-span-34", "row-span-35", "row-span-36", "row-span-37", "row-span-38", "row-span-39", "row-span-40", "row-span-41", "row-span-42", "row-span-43", "row-span-44", "row-span-45", "row-span-46", "row-span-47", "row-span-48", "row-span-49", "row-span-50", "row-span-51", "row-span-52", "row-span-53", "row-span-54", "row-span-55", "row-span-56", "row-span-57", "row-span-58", "row-span-59", "row-span-60", "row-span-61", "row-span-62", "row-span-63", "row-span-64", "row-span-65", "row-span-66", "row-span-67", "row-span-68", "row-span-69", "row-span-70", "row-span-71", "row-span-72", "row-span-73", "row-span-74", "row-span-75", "row-span-76", "row-span-77", "row-span-78", "row-span-79", "row-span-80", "row-span-81", "row-span-82", "row-span-83", "row-span-84", "row-span-85", "row-span-86", "row-span-87", "row-span-88", "row-span-89", "row-span-90", "row-span-91", "row-span-92", "row-span-93", "row-span-94", "row-span-95", "row-span-96", "row-span-97", "row-span-98", "row-span-99", "row-span-100", "row-span-101", "row-span-102", "row-span-103", "row-span-104", "row-span-105", "row-span-106", "row-span-107", "row-span-108", "row-span-109", "row-span-110", "row-span-111", "row-span-112", "row-span-113", "row-span-114", "row-span-115", "row-span-116", "row-span-117", "row-span-118", "row-span-119", "row-span-120", "row-span-121", "row-span-122", "row-span-123", "row-span-124", "row-span-125", "row-span-126", "row-span-127", "row-span-128", "row-span-129", "row-span-130", "row-span-131", "row-span-132", "row-span-133", "row-span-134", "row-span-135", "row-span-136", "row-span-137", "row-span-138", "row-span-139", "row-span-140", "row-span-141", "row-span-142", "row-span-143", "row-span-144"
]

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

const getColConfigFromSchedule = (schedule: Schedule) => {
    return colStartClasses[days.indexOf(schedule.day)]
}

const getRowConfigSchedule = (schedule: Schedule) => {
    const rowStart = parseInt(schedule.startTime) * HOUR_SUBS - 4
    const rowSpan = (parseInt(schedule.endTime) - parseInt(schedule.startTime)) * HOUR_SUBS - 1
    return `${rowStartClasses[rowStart]} ${rowSpanClasses[rowSpan]}`
}

export default function WeekSchedule({ className }: Props) {
    const gridCols = `grid-cols-[repeat(${GRID_COLUMNS},_minmax(0,_1fr))]`
    const gridRows = `grid-row-[repeat(${GRID_ROWS},_minmax(0,_1fr))]`

    return (
        <div className={cn(
            "flex flex-col",
            className
        )}>
            <div className={cn(
                "grid place-items-center",
                gridCols,
                gridRows,
                "h-full overflow-scroll pb-32"
            )}>
                {days.map((day, idx) => {
                    return (
                        <div key={idx} className={cn(
                            "w-full flex justify-center border-b pt-5 pb-1 h-10",
                            "sticky top-0 bg-white",
                            `${colStartClasses[idx]} col-span-1`, // Column start at one and span one col
                            `row-start-1 ${rowSpanClasses[HOUR_SUBS]}`, // row start at one and span one row
                            {"border-b-2 border-b-green-400" : idx === 3},
                            {"border-r" : idx === 0}
                        )}>
                            <div key={idx} className="text-xs">
                                {day.toLocaleUpperCase()}
                            </div>
                        </div>
                    );
                })}
                {days.map((day, colIdx) => {
                    return (
                        <>
                            {hours.map((hour, rowIdx) => {
                                return (
                                    <div 
                                        key={colIdx} 
                                        className={cn(
                                            "w-full h-full flex justify-center border-b py-6",
                                            `${colStartClasses[colIdx]} col-span-1`, // Column start at one and span one col
                                            `${rowStartClasses[rowIdx * (HOUR_SUBS - 1)]} ${rowSpanClasses[HOUR_SUBS]}`, // row start at one and span one row
                                            {"border-r": colIdx !== GRID_COLUMNS - 1} // No border to the last column
                                        )}
                                    >
                                        <div className="text-xs">
                                            {(colIdx === 0 && rowIdx !== 0) && getHourFromIndex(rowIdx)}
                                            {(colIdx === 0 && rowIdx === 0) && getHourFromIndex(24)}
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
                            "w-full h-full flex justify-center items-center",
                            "place-items-center",
                            getColConfigFromSchedule(schedule),
                            getRowConfigSchedule(schedule)
                        )}
                    >
                        <div className={cn(
                            "w-[96%] h-[99%] flex justify-center rounded-lg py-4",
                            activityColorMap[schedule.activity]
                        )}>
                            <div className="text-xs">
                                {activityEmojiMap[schedule.activity]} {schedule.activity}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}