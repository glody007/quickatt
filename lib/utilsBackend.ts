import prisma from "@/prisma/client";

export async function initSchedule(organisationId: string) {
    const days = ["mon", "tue", "wed", "thu", "fri"]
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
