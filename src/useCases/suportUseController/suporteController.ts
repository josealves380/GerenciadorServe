import { CreateSupoteType } from "./suporteSchemaVaidation";
import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getSuporte = async (req: Request, res: Response) => {
  const suporte = await prisma.suporte.findMany();
  return res.json(suporte);
};

export const createSuporte = async (
  req: Request<unknown, unknown, CreateSupoteType>,
  res: Response
) => {
  try {
    const { empresa, problema_relatado, telefone, tipo_sist } = req.body;

    await prisma.suporte.create({
      data: {
        empresa,
        problema_relatado,
        telefone,
        historico: "Análise",
        status_sup: true,
        tipo_sist
      },
      include: {
        user: true,
      },
    });
    return res.status(201).send({
      empresa,
      problema_relatado,
      telefone,
      tipo_sist
    });
  } catch (error) {
    return res.status(400).send("Falha ao criar user tente novamente");
  }
};

export const upSuporte = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { historico } = req.body;
     await prisma.suporte.update({
      where: { id: Number(id) || undefined },
      data: { historico: historico},
    });

    return res.status(201).send({historico});
  } catch (error) {
    res.json({ error: `Não foi possivel editar o status` });
  }
};

export const upSolucaoSuporte = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { solucao } = req.body;
     await prisma.suporte.update({
      where: { id: Number(id) || undefined },
      data: { solucao: solucao},
    }); 

    return res.status(201).send({solucao});
  } catch (error) {
    res.json({ error: `Não foi possivel editar o status` });
  }
};
export const upAtendenteSuporte = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { atendente } = req.body;
     await prisma.suporte.update({
      where: { id: Number(id) || undefined },
      data: { atendente: atendente},
    });

    return res.status(201).send({atendente});
  } catch (error) {
    res.json({ error: `Não foi possivel editar o status` });
  }
};
