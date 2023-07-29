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
    const endDate = addDays(new Date(), 1)

    const analytics = new Analytics(session.user.organisationId)

    const totalAgent = await analytics.countAgent()
    const visits = await analytics.countVisitsInRange(startDate, endDate, )
    const attendances = await analytics.countAccessInRange(startDate, endDate)
    const workingHours = await analytics.countAccessInRange(startDate, endDate)
    const workingDays = await analytics.workingDaysInRange(startDate, endDate)
    const totalAttendances = workingDays.length * totalAgent
    const attendancesRatio = attendances / totalAttendances
    // console.log('-----', workingDays.length, '----', attendances, '-----', totalAgent)

    try {
        const data = {
            totalAgent: totalAgent,
            attendances: attendances,
            absences: 2,
            visits: visits,
            workingHours: 300,
            workingDays: workingDays.length,
            attendancesRatio: attendancesRatio,
            absencesRatio: 0.2,
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