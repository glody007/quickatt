import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { authOptions } from "@/lib/auth";
import { Access, AgentCredential, agentCredentialSchema, visitSchema } from "@/data/schema";
import { Analytics, isToday } from "@/lib/utilServer";
import { addDays } from "date-fns";

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

        const visites = await analytics.visitsInRange(startDate, endDate)
        const accesses = await analytics.accessInRange(startDate, endDate)

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

    const lastAccess = await prisma.access.findFirst({
        where: {
            agentId: agent.id
        },
        orderBy: {
            entryTime: "desc"
        }
    })

    try {
        if(lastAccess?.exitTime && isToday(lastAccess.exitTime)) {
            return NextResponse.json({
                success: false,
                code: 401,
                errors: [{ message: "Vous avez déjà enregistré votre sortie" }]
            }, { status: 401 })
        }

        if(lastAccess?.entryTime && isToday(lastAccess.entryTime)) {
            const updatedAccess = await prisma.access.update({
                where: { id: lastAccess?.id },
                data: { 
                    ...lastAccess, 
                    exitTime: new Date()
                }
            })

            return NextResponse.json({
                success: true,
                code: 201,
                data: updatedAccess,
                message: "Sortie enregistré"
            }, { status: 201 })
        }

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
            data: access,
            message: "Entrée enregistré"
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