"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TopAttendance } from "@/components/topAttendance"
import { LayoutList, ListChecks, UserCog, Users } from "lucide-react"
import { OverviewYearWorkingHour } from "./overviewYearWorkingHour"
import { useQuery } from "react-query"
import axios from "axios"
import Loading from "./loading"
import { z } from "zod"
import { analyticsSchema } from "@/data/schema"

export function Overview() {
    const { data: response, error, isLoading } = useQuery({
        queryFn: async () => {
          const response = await axios.get("/api/analytics")
          return response.data
        },
        queryKey: ["analytics"]
    })

    if(error) return <>Error</>

    if(isLoading) return <Loading />

    const analytics = analyticsSchema.parse(response.data)

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Agents
                    </CardTitle>
                    <Users className="text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.totalAgent}</div>
                    <p className="text-xs text-muted-foreground">
                      For your organisation
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Attendance today
                    </CardTitle>
                    <ListChecks className="text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.attendances}</div>
                    <p className="text-xs text-muted-foreground">
                      {(analytics.attendancesRatio * 100).toFixed(2)}% are present today
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Absent today
                    </CardTitle>
                    <LayoutList className="text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.absences}</div>
                    <p className="text-xs text-muted-foreground">
                      {analytics.absencesRatio * 100}% are absent today
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Visit today
                    </CardTitle>
                    <UserCog className="text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.visits}</div>
                    <p className="text-xs text-muted-foreground">
                      Today
                    </p>
                  </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
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
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Top 6 Attendant</CardTitle>
                    <CardDescription>
                      For the last 30 days.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TopAttendance />
                  </CardContent>
                </Card>
            </div>
        </>
    )
}