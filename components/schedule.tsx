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

const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const hours = Array.from({ length: 24 }, (value, index) =>  getHourFromIndex(index));

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
            <div className="w-full h-screen overflow-scroll pb-32">
                {hours.map((hour, idx) => (
                    <div key={idx} className="grid grid-cols-7 place-items-center">
                        {days.map((day, idx) => {
                            return (
                                <div 
                                    key={idx} 
                                    className={cn(
                                        "w-full flex justify-center border-b py-6",
                                        {"border-r": idx !== 6}
                                    )}
                                >
                                    <div key={idx} className="text-xs">
                                        {hour}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div> 
        </div>
    )
}