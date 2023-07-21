import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"
import { titles } from "./data"
import { Agent, Holiday, Visit } from "./schema"

export const agents: Array<Agent> = Array.from({ length: 100 }, () => ({
  id: faker.string.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  number: faker.string.uuid(),
  title: faker.helpers.arrayElement(titles).value,
}))

const visits: Array<Visit> = Array.from({ length: 100 }, () => ({
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    number: faker.string.uuid(),
    motif: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
    entryTime: faker.date.birthdate(),
    exitTime: faker.date.birthdate()
}))

const holidays: Array<Holiday> = Array.from({ length: 10 }, () => ({
  id: faker.string.uuid(),
  name: faker.internet.userName(),
  date: faker.date.birthdate(),
  image: faker.image.avatar(),
}))

fs.writeFileSync(
  path.join(__dirname, "agents.json"),
  JSON.stringify(agents, null, 2)
)

fs.writeFileSync(
    path.join(__dirname, "visits.json"),
    JSON.stringify(visits, null, 2)
)

fs.writeFileSync(
  path.join(__dirname, "holidays.json"),
  JSON.stringify(holidays, null, 2)
)

console.log("✅ Agents Visits and holidays data generated.")