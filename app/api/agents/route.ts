import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { authOptions } from "@/lib/auth";
import { Agent, agentSchema } from "@/data/schema";

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
        const data = await prisma.agent.findMany({
            where: { 
                organisationId: session.user.organisationId
            },
            orderBy: {
                name: 'asc'
            },
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
            errors: [{ message: "Error fetching agents" }]
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

    const agentData: Agent = await req.json()
    
    const validate = agentSchema.safeParse(agentData)
    
    if(!validate.success) {
        return NextResponse.json({
            success: false,
            code: 403,
            errors: validate.error.issues.map(issue => ({
                message: issue.message
            }))
        }, { status: 403 })
    }

    const agentWithSameNumber = await prisma.agent.findFirst({
        where: {
            number: agentData.number
        }
    })

    if(agentWithSameNumber) {
        return NextResponse.json({
            success: false,
            code: 403,
            errors: [{ message: "Numéro déja utilisé" }]
        }, { status: 403 })
    }

    const agentWithSameEmail = await prisma.agent.findFirst({
        where: {
            email: agentData.email
        }
    })

    if(agentWithSameEmail) {
        return NextResponse.json({
            success: false,
            code: 403,
            errors: [{ message: "Email déja utilisé" }]
        }, { status: 403 })
    }

    try {
        const agent = await prisma.agent.create({
            data: {
                ...agentData,
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