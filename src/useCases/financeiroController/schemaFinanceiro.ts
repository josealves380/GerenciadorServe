import { z } from "zod";

export const financeiroBody = z.object({
  body: z.object({
    nome: z.string(),
    valor: z.number()
  })
})

export type createFinanceiroType = z.infer<typeof financeiroBody>["body"]