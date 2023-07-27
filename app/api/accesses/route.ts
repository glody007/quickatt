import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { authOptions } from "@/lib/auth";
import { Access, AgentCredential, agentCredentialSchema, visitSchema } from "@/data/schema";

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
        const visites = await prisma.visit.findMany({
            where: { 
                organisationId: session.user.organisationId
            },
            orderBy: {
                entryTime: 'desc'
            },
        })

        const accesses = await prisma.access.findMany({
            where: { 
                organisationId: session.user.organisationId
            },
            orderBy: {
                entryTime: 'desc'
            },
            include: {
                agent: true
            }
        })

        const visiteData: Array<Access> = visites.map((access) => {
                return {
                    ...visitSchema.parse(access),
                    type: "visit"
                }
        })

        const accessData: Array<Access> = accesses.map((access) => {
            return {
                id: access.id,
                name: access.agent.name,
                email: access.agent.email || "",
                number: access.agent.number,
                entryTime: access.entryTime,
                exitTime: access.exitTime || new Date("1970-01-01T00:00:00.000Z"),
                type: "agent"
            }
        })

        const data = [...visiteData, ...accessData]

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
            errors: [{ message: "Error fetching accesses" }]
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

    const credentialData: AgentCredential = await req.json()
    
    const validate = agentCredentialSchema.safeParse(credentialData)
    
    if(!validate.success) {
        return NextResponse.json({
            success: false,
            code: 403,
            errors: validate.error.issues.map(issue => ({
                message: issue.message
            })) 
        }, { status: 403 })
    }

    const agent = await prisma.agent.findFirst({
        where: {
            pin: credentialData.pin
        }
    })

    if(!agent) return NextResponse.json({
        success: false,
        code: 401,
        errors: [{ message: "Mot de passe incorrect" }]
    }, { status: 401 })

    try {
        const access = await prisma.access.create({
            data: {
                entryTime: new Date(),
                agentId: agent.id,
                organisationId: session.user.organisationId
            }
        })

        return NextResponse.json({
            success: true,
            code: 201,
            data: access
        }, { status: 201 })
    } catch(err) {
        console.log(err)
        return NextResponse.json({
            success: false,
            code: 500,
            errors: [{ message: "Error has occured while adding access" }]
        }, { status: 500 })
    }
}