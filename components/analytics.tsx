"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Hourglass, ListChecks, Sunrise, UserCog } from "lucide-react"
import { WorkingHourRange } from "./workingHourRange"
import { AttendanceRange } from "./attendanceRange"
import axios from "axios"
import Loading from "./loading"
import { analyticsSchema } from "@/data/schema"
import { useQuery } from "react-query"
import { useAnalyticRange } from "@/store/useAnalyticRange"
import { useEffect } from "react"

export function Analytics() {
    const { range } = useAnalyticRange()
    const { data: response, error, isLoading, refetch } = useQuery({
        queryFn: async () => {
          const response = await axios.get(`/api/analytics?startDate=${range.startDate}&endDate=${range.endDate}`)
          return response.data
        },
        queryKey: ["analytics-details", range]
    })

    useEffect(() => {
      console.log('REFETCH', range)
    }, [range])

    if(error) return <>Error</>

    if(isLoading) return <Loading />

    const analytics = analyticsSchema.parse(response.data)

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Attendances
                    </CardTitle>
                    <ListChecks className="text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(analytics.attendancesRatio * 100).toFixed(2)}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      For working days
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Working hours
                    </CardTitle>
                    <Hourglass className="text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analytics.workingHoursVolume.toFixed(2)} Hours
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {(analytics.workingHoursRatio * 100).toFixed(2)}% of {analytics.workingHours.toFixed(2)} total Hours
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Visites
                    </CardTitle>
                    <UserCog className="text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analytics.visits}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      For all days 
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Working days
                    </CardTitle>
                    <Sunrise className="text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.workingDays}</div>
                    <p className="text-xs text-muted-foreground">
                      In the selected range
                    </p>
                  </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Attendances</CardTitle>
                    <CardDescription>
                      Attendances for the selected range.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <AttendanceRange />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Working hours</CardTitle>
                    <CardDescription>
                      Working hours for the selected range.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WorkingHourRange />
                  </CardContent>
                </Card>
            </div>
        </>
    )
}