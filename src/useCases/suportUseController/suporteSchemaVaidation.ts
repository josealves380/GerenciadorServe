import { string, z } from "zod";

  export const suporteBody = z.object({
    body: z.object({  
    empresa: z.string(),    
    telefone: z.string(),
    problema_relatado: z.string(),  
    tipo_sist: z.string(),    
  })
})

// export const clienteUpdateBody = z.object({
//   body: z.object({
//     email: z.string(),
//     name: z.string(),
//     cnpj: z.string(),
//     rz_social: z.string(),
//     tel_contato: z.string(),
//     telefone: z.string(), 

//   })
  
// })

  export type CreateSupoteType = z.infer<typeof suporteBody>["body"]