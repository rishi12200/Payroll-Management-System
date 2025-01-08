import { z } from "zod"
import { joiningdates } from "./data"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  position: z.string(),
  salary: z.number(),
  //joiningdate: z.date(), // Transform string to Date
    joiningdate: z.preprocess((value) => {
    return typeof value === "string" ? new Date(value) : value;
  }, z.date()), // Preprocess strings to Date objects
  status: z.string(),
  designation: z.string(),
  label: z.string().optional(), // Optional label

})



export type Task = z.infer<typeof taskSchema>