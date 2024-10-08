import {  z } from "zod";

export const boletoBody = z.object({
  body: z.object({
    id: z.number(),
    valor_documento: z.number(),
    cliente_id: z.number(),
    boleto_id: z.number(),
    data_vencimento: z.string().min(10, "Precisa ser uma data válida"),
    data_documento: z.string(),
    obs_corpo: z.string().min(4),
    n_fantasia: z.string(),
    email: z.string().email("Precisa ser um email válido"),
    status: z.string(),
    parceiro_id: z.number(),
    data_pagamento: z.string(),
    data_processamento: z.string(),
    numero_pagamento: z.string(),
    numero_documento: z.string(),
    rz_social: z.string(),
    cnpj: z.string(),
    numero: z.string(),
    bairro: z.string(),
    estado: z.string(),
    cep: z.string(),
    ibge: z.string(),
    cidade: z.string(),
    endereco: z.string(),
    clienteboleto: z.array(z.string()),
  }),
});

export type createBoletoType = z.infer<typeof boletoBody>["body"];
