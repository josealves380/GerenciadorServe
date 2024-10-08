import { z } from "zod";

  export const contadorBody = z.object({
    body: z.object({
    nome: z.string().min(8, "precisa ter 8 caracteres"),
    email: z.string().email("Precisa ser válido"),     
    senha: z.string(),
    cnpj: z.string().min(14, "precisa ter 14 números"),
    insc_estadual: z.string(),
    rz_social: z.string(),
    n_fantasia: z.string(),
    cep: z.string(),
    cidade: z.string(),
    ibge: z.string(),
    uf: z.string(),
    endereco: z.string(),
    numero: z.string(),
    bairro: z.string(),
    telefone: z.string(),
    contador_id: z.number(),
    id: z.number(),            
  })  
})

export type createContadorType = z.infer<typeof contadorBody>["body"]