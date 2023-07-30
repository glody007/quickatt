import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { authOptions } from "@/lib/auth";
import { Organisation, organisationSchema } from "@/data/schema";
import { initSchedule } from "@/lib/utilServer";

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
        const data = await prisma.organisation.findMany({
            orderBy: {
                name: 'asc'
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
            errors: [{ message: "Error fetching organisations" }]
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

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id 
        }
    })

    if(!user) return NextResponse.json({
        success: true,
        code: 404,
        errors: [{message: "User not found"}]
    }, { status: 404 })

    const orgData: Organisation = await req.json()
    
    const validate = organisationSchema.safeParse(orgData)
    
    if(!validate.success) {
        return NextResponse.json({
            success: false,
            code: 403,
            errors: validate.error.issues.map(issue => ({
                message: issue.message
            }))
        }, { status: 403 })
    }

    if(user?.organisationId) {
        return NextResponse.json({
            success: false,
            code: 403,
            errors: [{ message: "Vous avez déja une organisation" }]
        }, { status: 403 })
    }

    try {
        const org = await prisma.organisation.create({
            data: orgData
        })

        await prisma.user.update({
            where: { id: user?.id },
            data: { 
                ...user, 
                organisationId: org.id 
            }
        })

        initSchedule(org.id)

        return NextResponse.json({
            success: true,
            code: 201,
            data: org
        }, { status: 201 })
    } catch(err) {
        console.log(err)
        return NextResponse.json({
            success: false,
            code: 500,
            errors: [{ message: "Error has occured while creating organisation" }]
        }, { status: 500 })
    }
}