import { number, z } from "zod";

  export const clienteBody = z.object({
    body: z.object({
      cnpj: z.string().min(14, 'Cnpj precisa ter 14 caracteres'),
      insc_estadual: z.string(),
      rz_social: z.string(),
      n_fantasia: z.string(),
      email: z.string().email("Precisa ser um email válido"),     
      senha: z.string(),
      tecnico: z.string(),
      cep: z.string(),
      cidade: z.string(),
      ibge: z.string(),
      uf: z.string(),
      endereco: z.string(),
      numero: z.string(),
      bairro: z.string(),
      telefone: z.string(),
      name: z.string(),
      tel_contato: z.string(),
      data_impl: z.string(),
      data_pag: z.string(),
      id: z.number(), 
      nome: z.string(),
      tipo_envio: z.string(),
      perc_mensal: z.number(),     
      valor_mensal: z.number(),
      basic: z.string(),
    })
})

export const clienteUpdateBody = z.object({
  body: z.object({
    cnpj: z.string().min(14, 'Cnpj precisa ter 14 caracteres'),
    insc_estadual: z.string(),
    rz_social: z.string(),
    n_fantasia: z.string(),
    email: z.string().email("Precisa email ser válido"),     
    senha: z.string(),
    tecnico: z.string(),
    cep: z.string(),
    cidade: z.string(),
    ibge: z.string(),
    uf: z.string(),
    endereco: z.string(),
    numero: z.string(),
    bairro: z.string(),
    telefone: z.string(),
    name: z.string(),
    tel_contato: z.string(),
    data_impl: z.string(),
    data_pag: z.string(),
    id: z.number(), 
    basic: z.string(),
        
  })

  
})
export const clienteIdUpdateBody = z.object({
  body: z.object({
   
    id: z.number(), 
   
     
  })

})
  export type CreateClientType = z.infer<typeof clienteBody>["body"]
  export type updateClientType = z.infer<typeof clienteUpdateBody>["body"]
  export type clienteIdClientType = z.infer<typeof clienteIdUpdateBody >["body"]