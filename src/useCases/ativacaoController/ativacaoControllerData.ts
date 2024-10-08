import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";
//função para gravar a ativação do cliente
export const createQativacao = async (req: Request, res: Response) => {
  const { cliente_id } = req.params;
  const { ativacao_id } = req.params;
  const qtd = await prisma.qativacao.create({
    data: {
      cliente_id: Number(cliente_id), 
      ativacao_id: Number(ativacao_id)
    },
    include: {
      ativacao: { 
        select: { 
          id: true,          
        },
      },
    },
  });
  return res.json({ qtd });
};
