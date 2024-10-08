import { z } from "zod";

export const productBody = z.object({
  body: z.object({
    nome: z.string(),
    valor: z.number()
  })
})

export type createProductType = z.infer<typeof productBody>["body"]