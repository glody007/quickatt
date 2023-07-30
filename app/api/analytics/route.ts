import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { authOptions } from "@/lib/auth";
import { addDays } from "date-fns";
import { Analytics } from "@/lib/utilsBackend";

export async function GET(
    req: NextRequest
) {
    const session = await getServerSession(authOptions)

    if(!session) return NextResponse.json({
        success: false,
        code: 401,
        errors: [{ message: "Please sign in" }]
    }, { status: 401 })

    const startDate = addDays(new Date(), -1)
    const endDate = addDays(new Date(), 0)

    const analytics = new Analytics(session.user.organisationId)

    const totalAgent = await analytics.countAgent()
    const visits = await analytics.countVisitsInRange(startDate, endDate, )
    const attendances = await analytics.countAccessInRange(startDate, endDate)
    const attendancesForWorkingDays = await analytics.countAccessForWorkingDaysInRange(startDate, endDate)
    const workingHours = await analytics.countAccessInRange(startDate, endDate)
    const workingDays = await analytics.workingDaysInRange(startDate, endDate)
    const totalAttendancesForWorkingDays = workingDays.length * totalAgent
    const absencesForWorkingDays = totalAttendancesForWorkingDays - attendancesForWorkingDays
    const attendancesRatioForWorkingDays = totalAttendancesForWorkingDays ? attendancesForWorkingDays / totalAttendancesForWorkingDays : 0
    const absencesRatioForWorkingDays = totalAttendancesForWorkingDays ? 1 - attendancesRatioForWorkingDays : 0

    try {
        const data = {
            totalAgent: totalAgent,
            attendances: attendances,
            absences: absencesForWorkingDays,
            visits: visits,
            workingHours: 300,
            workingDays: workingDays.length,
            attendancesRatio: attendancesRatioForWorkingDays,
            absencesRatio: absencesRatioForWorkingDays,
            workingHoursVolume: 240,
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