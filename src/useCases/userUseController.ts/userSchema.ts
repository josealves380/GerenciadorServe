import { z } from "zod";

export const userBody = z.object({
  body: z.object({
    name: z.string().min(3, "precisa ter 3 caracteres"),
    email: z.string().email("Precisa ser válido"),
    senha: z.string(), 
    nivel: z.string(),             
  })
})