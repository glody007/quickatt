import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Hourglass, LogIn, PersonStanding, Sunrise } from "lucide-react"
import { WorkingHourRange } from "./workingHourRange"
import { AttendanceRange } from "./attendanceRange"

export function Analytics() {
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Attendances
                    </CardTitle>
                    <LogIn className="text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                        60 %
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
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
                        300 Hours
                    </div>
                    <p className="text-xs text-muted-foreground">
                      -10.0% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Visit
                    </CardTitle>
                    <PersonStanding className="text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                        680
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +15.0% from last month
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
                    <div className="text-2xl font-bold">20</div>
                    <p className="text-xs text-muted-foreground">
                      working days
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