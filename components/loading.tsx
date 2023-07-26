import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { HtmlHTMLAttributes } from "react";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
    
}

export default function Loading({ className }: Props) {

    return (
        <div className={cn(
            "w-full flex justify-center",
            className
        )}>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
        </div>
    )
}