import prisma from "@/prisma/client";
import { addDays, eachDayOfInterval, format, isBefore, isSameDay } from "date-fns";
import { enUS } from "date-fns/locale";

export async function initSchedule(organisationId: string) {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
    const schedules = [
        { activity: "work", startTime: "08:00", endTime: "12:00", timeZone: "Africa/Lubumbashi" },
        { activity: "break", startTime: "12:00", endTime: "13:00", timeZone: "Africa/Lubumbashi" },
        { activity: "work", startTime: "13:00", endTime: "17:00", timeZone: "Africa/Lubumbashi" }
    ]

    for(const day of days) {
        for(const schedule of schedules) {
            await prisma.schedule.create({
                data: {
                    ...schedule,
                    day,
                    organisationId
                },
            })
        }
    }
}

export function genPassword() {
    let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 4;
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password
}

export function isToday(date: Date) {
    return isSameDay(date, new Date())
}

export class Analytics {
    organisationId: string;

    constructor(organisationId: string, agentId?: string) {
        this.organisationId = organisationId
    }

    async schedulesInRange(start: Date, end: Date) {
        return prisma.schedule.findMany({
            where: {
                AND: [
                    { 
                        createdAt: {
                            lte: end
                        }
                    },
                ]
            }
        })
    }
    

    async workingDaysNameInWeek(start: Date, end: Date) {
        const schedules = await this.schedulesInRange(start, end)
        // TO DO: Filter unique day
        return schedules.filter(schedule => schedule.activity == "work")
                        .map(schedule => schedule.day)
    }

    // TO DO: Schedule creation and deletion in logic
    async workingDaysInRange(start: Date, end: Date) {
        const workingDaysNameInWeek = await this.workingDaysNameInWeek(start, end)
        const daysOfInterval = eachDayOfInterval({start, end})
                                .map((day) => ({
                                    name: format(day, 'EEE', { locale: enUS }),
                                    date: day
                                }))
        return daysOfInterval
                .filter(day => workingDaysNameInWeek.includes(day.name))
                .map(day => day.date)
    }

    async countAgent() {
        return prisma.agent.count()
    }

    async countVisitsInRange(startDate: Date, endDate: Date) {
        return prisma.visit.count({
            where: {
                AND: [
                    {
                        organisationId: this.organisationId
                    },
                    {
                        entryTime: {
                            gte: startDate
                        }
                    },
                    {
                        entryTime: {
                            lte: endDate
                        }
                    }
                ]
            }
        })
    }

    async countAccessInRange(startDate: Date, endDate: Date) {
        return (await this.accessInRange(startDate, endDate)).length
    }

    async countAccessForWorkingDaysInRange(startDate: Date, endDate: Date) {
        return (await this.accessForWorkingDaysInRange(startDate, endDate)).length
    }

    async accessInRange(startDate: Date, endDate: Date) {
        return prisma.access.findMany({
            where: {
                AND: [
                    {
                        organisationId: this.organisationId
                    },
                    {
                        entryTime: {
                            gte: startDate
                        }
                    },
                    {
                        entryTime: {
                            lte: endDate
                        }
                    }
                ]
            }
        })
    }

    async accessForWorkingDaysInRange(startDate: Date, endDate: Date) {
        const workingDaysNameInWeek = await this.workingDaysNameInWeek(startDate, endDate)
        const totalAccess = await this.accessInRange(startDate, endDate)
        return totalAccess
                .filter(acces => workingDaysNameInWeek.includes(format(acces.entryTime, 'EEE', { locale: enUS })))
    }
}
