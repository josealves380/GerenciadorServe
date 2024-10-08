import { z } from "zod";

export const loginBody = z.object({
  body: z.object({
    user_id: z.string(),
    ip: z.string(),
    email: z.string(),
    login_id: z.number(),
    cliente_id: z.number(),
    parceiro_id: z.number(),
    cnpj: z.string(),
  }),
});

export type createLoginType = z.infer<typeof loginBody>["body"];
