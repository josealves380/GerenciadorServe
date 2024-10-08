import { z } from "zod";

export const chaveBody = z.object({
  body: z.object({
    cliente_id: z.number(),
    cnpj: z.string(),
    n_pdv: z.string(),
    n_dav: z.string(),
    tipo_sist: z.string()
  })
})

export type CreateChave = z.infer<typeof chaveBody>["body"]