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
import { HtmlHTMLAttributes } from "react";
import { useQuery } from "react-query";
import Loading from "./loading";
import { OverviewYearWorkingHour } from "./overviewYearWorkingHour";
import UserInfoOverviewCard from "./userInfoOverviewCard";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
    agent: Agent
}

export default function UserInfo({ agent, className }: Props) {
    const { range } = useUserRange()
    const { data: response, error, isLoading } = useQuery({
        queryFn: async () => {
          const response = await axios.get(`/api/analytics?startDate=${range.startDate}&endDate=${range.endDate}`)
          return response.data
        },
        queryKey: ["user-details", range]
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