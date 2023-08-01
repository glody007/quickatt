"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Agent, analyticsSchema } from "@/data/schema";
import { cn } from "@/lib/utils";
import { useUserRange } from "@/store/useUserRange";
import axios from "axios";
import { format } from "date-fns";
import { HtmlHTMLAttributes } from "react";
import { useQuery } from "react-query";
import { AttendanceUserAnalytic } from "./attendanceUserAnalytic";
import Loading from "./loading";
import UserInfoOverviewCard from "./userInfoOverviewCard";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
    agent: Agent
}

export default function UserInfo({ agent, className }: Props) {
    const { range } = useUserRange()

    const { data: response, error, isLoading } = useQuery({
        queryFn: async () => {
          const response = await axios.get(`/api/analytics?startDate=${range.startDate}&endDate=${range.endDate}&agent=${agent.id}`)
          return response.data
        },
        queryKey: ["user-details", range, agent]
    })

    if(error) return <>Error</>

    if(isLoading) return <Loading />

    const analytics = analyticsSchema.parse(response.data)

    return (
        <div className={cn(
            className
        )}>
            <div className="flex flex-col space-y-8">
                <div className="flex justify-between">
                    <UserInfoOverviewCard 
                        title="Selected Period" 
                        info={`${format(new Date(range.startDate), "PPP")} - ${format(new Date(range.endDate), "PPP")}`}
                        className="flex-[0.6]"
                    />
                    <UserInfoOverviewCard 
                        title="Working Hours" 
                        info={`${analytics.workingHoursVolume.toFixed(2)}h - ${(analytics.workingHoursRatio * 100).toFixed(2)}%`}
                        className="flex-[0.4]"
                    />
                </div>
                <div className="flex justify-between">
                    <UserInfoOverviewCard 
                        title="Presences / Working days" 
                        info={`${analytics.attendancesForWorkingDays} / ${analytics.workingDays}`}
                        className="flex-[0.6]"
                    />
                    <UserInfoOverviewCard 
                        title="Absences / Working days" 
                        info={`${analytics.absences} / ${analytics.workingDays}`}
                        className="flex-[0.4]"
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
                    <AttendanceUserAnalytic />
                  </CardContent>
                </Card>
            </div>
        </div>
    )
}