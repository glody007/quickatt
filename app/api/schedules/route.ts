import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { authOptions } from "@/lib/auth";
import { Schedule, scheduleSchema } from "@/data/schema";
import { areSchedulesOverlapping } from "@/lib/utils";

export async function GET(
    req: NextRequest
) {
    const session = await getServerSession(authOptions)

    if(!session) return NextResponse.json({
        success: false,
        code: 401,
        errors: [{ message: "Please sign in" }]
    }, { status: 401 })

    try {
        const data = await prisma.schedule.findMany({
            orderBy: {
                day: 'asc'
            }
        })
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
            errors: [{ message: "Error fetching schedules" }]
        }, { status: 500 })
    }  
}

export async function POST(
    req: NextRequest
) {
    const session = await getServerSession(authOptions)
    
    if(!session) return NextResponse.json({
        success: false,
        code: 401,
        errors: [{ message: "Please sign in" }]
    }, { status: 401 })

    const scheduleData: Schedule = await req.json()
    
    const validate = scheduleSchema.safeParse(scheduleData)
    
    if(!validate.success) {
        return NextResponse.json({
            success: false,
            code: 403,
            errors: validate.error.issues.map(issue => ({
                message: issue.message
            }))
        }, { status: 403 })
    }

    // TEST OVERLAPPING SCHEDULE
    const daySchedules = await prisma.schedule.findMany({
        where: {
            day: scheduleData.day
        }
    })

    for(const schedule of daySchedules) {
        if(areSchedulesOverlapping(scheduleData, scheduleSchema.parse(schedule))) {
            return NextResponse.json({
                success: false,
                code: 403,
                errors: [{ message: "There is an another activity in the selected range" }]
            }, { status: 403 })
        }
    }

    try {
        const schedule = await prisma.schedule.create({
            data: {
                ...scheduleData,
                organisationId: session.user.organisationId
            },
        })

        return NextResponse.json({
            success: true,
            code: 201,
            data: schedule
        }, { status: 201 })
    } catch(err) {
        console.log(err)
        return NextResponse.json({
            success: false,
            code: 500,
            errors: [{ message: "Error has occured while creating schedule" }]
        }, { status: 500 })
    }
}