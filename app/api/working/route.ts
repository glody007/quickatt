import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { authOptions } from "@/lib/auth";
import { addDays } from "date-fns";
import { Analytics, formatDateYMD } from "@/lib/utilServer";

export async function GET(
    req: NextRequest
) {
    const session = await getServerSession(authOptions)

    if(!session) return NextResponse.json({
        success: false,
        code: 401,
        errors: [{ message: "Please sign in" }]
    }, { status: 401 })

    const url = new URL(req.url)

    const starDateString = url.searchParams.get('startDate')
    const endDateString = url.searchParams.get('endDate')
    const agentId = url.searchParams.get('agent') || undefined

    const today = new Date(formatDateYMD(new Date()))
    const startDate = starDateString ? new Date(starDateString) : addDays(today, -6)
    const endDate = endDateString ? addDays(new Date(endDateString), 1) : addDays(today, 0)

    const analytics = new Analytics(session.user.organisationId, agentId)
    const agentsWorkingHoursInRange = await analytics.agentsWorkingHoursInRange(startDate, endDate)
    const agentsAttendancesInRange = await analytics.agentsAttendancesInRange(startDate, endDate)

    try {
        const data = {
            daysWorkingHours: agentsWorkingHoursInRange.daysWorkingHours,
            daysAttendances: agentsAttendancesInRange.daysAttendances
        }

        return NextResponse.json({
            success: true,
            code: 200,
            data: data
        }, { status: 200 })
    } catch(err) {
        console.log(err)
        return NextResponse.json({
            success: false,
            code: 500,
            errors: [{ message: "Error fetching working hours" }]
        }, { status: 500 })
    }  
}