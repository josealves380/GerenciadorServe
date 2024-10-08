import { z } from "zod";

export const configF2bBody = z.object({
  body: z.object({
    id: z.number(),
    basic: z.string(),
    salario: z.number(),
    user_id: z.string()
  }) 
})

export type CreateF2bType = z.infer<typeof configF2bBody>["body"]