import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { authOptions } from "@/lib/auth";
import { addDays } from "date-fns";
import { Analytics } from "@/lib/utilServer";

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

    const startDate = starDateString ? new Date(starDateString) : addDays(new Date(), -1)
    const endDate = endDateString ? new Date(endDateString) : addDays(new Date(), 0)

    const analytics = new Analytics(session.user.organisationId, agentId)

    const totalAgent = await analytics.countAgent()
    const visits = await analytics.countVisitsInRange(startDate, endDate, )
    const attendances = await analytics.countAccessInRange(startDate, endDate)
    const attendancesForWorkingDays = await analytics.countAccessForWorkingDaysInRange(startDate, endDate)
    const workingDays = await analytics.workingDaysInRange(startDate, endDate)
    const totalAttendancesForWorkingDays = workingDays.length * totalAgent
    const absencesForWorkingDays = totalAttendancesForWorkingDays - attendancesForWorkingDays
    const attendancesRatioForWorkingDays = totalAttendancesForWorkingDays ? attendancesForWorkingDays / totalAttendancesForWorkingDays : 0
    const absencesRatioForWorkingDays = totalAttendancesForWorkingDays ? 1 - attendancesRatioForWorkingDays : 0
    const workingHours = await analytics.workingHoursInRange(startDate, endDate)
    const totalWorkingHours = workingHours * totalAgent
    const agentsWorkingHoursInRange = await analytics.agentsWorkingHoursInRange(startDate, endDate)
    const workingHoursRatio = totalWorkingHours ? agentsWorkingHoursInRange.totalHours / totalWorkingHours : 0

    try {
        const data = {
            totalAgent: totalAgent,
            attendances: attendances,
            attendancesForWorkingDays: attendancesForWorkingDays,
            absences: absencesForWorkingDays,
            visits: visits,
            workingHours: totalWorkingHours,
            workingDays: workingDays.length,
            attendancesRatio: attendancesRatioForWorkingDays,
            absencesRatio: absencesRatioForWorkingDays,
            workingHoursVolume: agentsWorkingHoursInRange.totalHours,
            workingHoursRatio: workingHoursRatio
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
            errors: [{ message: "Error fetching analytics" }]
        }, { status: 500 })
    }  
}