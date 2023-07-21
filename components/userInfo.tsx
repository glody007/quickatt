import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { HtmlHTMLAttributes } from "react";
import { OverviewYearWorkingHour } from "./overviewYearWorkingHour";
import UserInfoOverviewCard from "./userInfoOverviewCard";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {

}

export default function UserInfo({ className }: Props) {

    return (
        <div className={cn(
            className
        )}>
            <div className="flex flex-col space-y-8">
                <div className="flex justify-between">
                    <UserInfoOverviewCard 
                        title="Selected Period" 
                        info="Jul 1st - 3st, 2022"
                        className="flex-1"
                    />
                    <UserInfoOverviewCard 
                        title="Working Hours" 
                        info="300 h - 80 %"
                        className="flex-1"
                    />
                </div>
                <div className="flex justify-between">
                    <UserInfoOverviewCard 
                        title="Presences / Working days" 
                        info="40 / 50"
                        className="flex-1"
                    />
                    <UserInfoOverviewCard 
                        title="Absences / Working days" 
                        info="10 / 50"
                        className="flex-1"
                    />
                </div>
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                    <CardDescription>
                        Working hours for this year.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <OverviewYearWorkingHour />
                  </CardContent>
                </Card>
            </div>
        </div>
    )
}