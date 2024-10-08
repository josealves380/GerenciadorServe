import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";
import { createFinanceiroType } from "./schemaFinanceiro";

export const createFinanceiro = async (req: Request, res: Response) => {
    const {cliente_id} = req.params;
    const {mensalidade_id} = req.params;
    const { valor } = req.body;
    try{

      const qtd = await prisma.financeiro.create({
        data: {
          valor,
        mensalidade_id: Number(mensalidade_id),
        cliente_id: Number(cliente_id),
      },
      include: {
        mensalidade: {
          select: {
            id: true, 
          },
        },
      },
    });
    return res.status(200).json({ qtd }); 
  }catch(error){ return res.send(error)}
  };

export const getMensalidade = async (req: Request, res: Response) => {
  try{

    const mensal = await prisma.financeiro.findMany({orderBy:{id: "desc"}});
    
    return res.json(mensal);
  }catch(error){ return res.send(error)}
}
// export const getMensalidadeUnica = async (req: Request, res: Response) => {
//   const cliente_id = req.params
//   const mensal = await prisma.financeiro.findUnique({
//     where:{  },include:{cliente: {include:cliente_id}}
//   });

//   return res.json(mensal);
// }f