import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"

import { labels, designations, statuses } from "./data"

const tasks = Array.from({ length: 100 }, () => ({
  id: `TASK-${faker.number.int({ min: 1000, max: 9999 })}`,
  title: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  //email: faker.helpers.arrayElement(emails).value,
  //phone: faker.helpers.arrayElement(phones).value,
  status: faker.helpers.arrayElement(statuses).value,
  designation: faker.helpers.arrayElement(designations).value,

  //joiningdate: faker.helpers.arrayElement(joiningdates).value,


  label: faker.helpers.arrayElement(labels).value,
}))

fs.writeFileSync(
  path.join(__dirname, "tasks.json"),
  JSON.stringify(tasks, null, 2)
)

console.log("✅ Tasks data generated.")