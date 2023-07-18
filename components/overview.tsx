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

export function Overview() {
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
                    <div className="text-2xl font-bold">48</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
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
                    <div className="text-2xl font-bold">40</div>
                    <p className="text-xs text-muted-foreground">
                      -10.0% from yesterday
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
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">
                      +10.0% from yesterday
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
                    <div className="text-2xl font-bold">573</div>
                    <p className="text-xs text-muted-foreground">
                      +20 from yesterday
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