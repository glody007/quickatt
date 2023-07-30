import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { authOptions } from "@/lib/auth";
import { Visit, visitSchema } from "@/data/schema";
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
    const dateString = url.searchParams.get('date')
    const date = dateString ? new Date(dateString) : new Date()

    const startDate = date
    const endDate = addDays(date, 1)

    try {
        const analytics = new Analytics(session.user.organisationId)
        const data = await analytics.visitsInRange(startDate, endDate)
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
            errors: [{ message: "Error fetching visits" }]
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

    const visitData: Visit = await req.json()
    
    const validate = visitSchema.safeParse(visitData)
    
    if(!validate.success) {
        return NextResponse.json({
            success: false,
            code: 403,
            errors: validate.error.issues.map(issue => ({
                message: issue.message
            }))
        }, { status: 403 })
    }

    try {
        const agent = await prisma.visit.create({
            data: {
                ...visitData,
                entryTime: new Date(),
                organisationId: session.user.organisationId
            }
        })

        return NextResponse.json({
            success: true,
            code: 201,
            data: agent
        }, { status: 201 })
    } catch(err) {
        console.log(err)
        return NextResponse.json({
            success: false,
            code: 500,
            errors: [{ message: "Error has occured while adding agent" }]
        }, { status: 500 })
    }
}