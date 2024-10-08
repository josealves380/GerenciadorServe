import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";

export const Getquantidade = async (req: Request, res: Response) => {
  const { cliente_id } = req.params;
  const { produto_id } = req.params;
  try {
    const { valor } = req.body;

    await prisma.quantidade.create({
      data: {
        valor,
        cliente_id: Number(cliente_id),
        produto_id: Number(produto_id),
      },
      include: {
        produto: {
          select: {
            id: true,
          },
        },
      },
    });
    return res.status(201).send({ valor });
  } catch (error) {
    return res.status(400).send("Falha ao criar");
  }
};
export const getProdutoCliente = async (req: Request, res: Response) => {
  const { cliente_id } = req.params;
  try {
    const produtoCliente = await prisma.quantidade.findMany({
      where: {
        cliente_id: Number(cliente_id),
      },
      include: {
        produto: {
          select: {
            valor: true,
          },
        },
      },
    });
    return res.json(produtoCliente);
  } catch (error) {
    return res.send(error);
  }
};

export const sumProdutoCliente = async (req: Request, res: Response) => {
  const { cliente_id } = req.params;
  try {
    const [
      {
        _sum: { valor },
      },
    ] = await prisma.quantidade.groupBy({
      by: ["cliente_id"],

      where: {
        cliente_id: Number(cliente_id),
      },
      _sum: {
        valor: true,
      },
    });
    return res.json({ valor });
  } catch (error) {
    return res.send(error);
  }
};

export const getDataAtiva = async (req: Request, res: Response) => {
  try {
    const qativacao = await prisma.qativacao.findMany({
      orderBy: { data_status: "desc" },
    });

    return res.json(qativacao);
  } catch (error) {
    return res.send(error);
  }
};
export const getDataGroup = async (req: Request, res: Response) => {
  const { data_inicial } = req.body;
  const { data_final } = req.body;
  try {
    const qativacao = await prisma.qativacao.count({
      where: {
        data_status: {
          lte: new Date(data_final).toISOString(),
          gte: new Date(data_inicial).toISOString(),
        },
        AND: [
          {
            ativacao_id: 1,
          },
        ],
      },
    });
    return res.json(qativacao);
  } catch (error) {
    return res.send(error);
  }
};
export const getDataGroupTwo = async (req: Request, res: Response) => {
  const { data_inicial } = req.body;
  const { data_final } = req.body;
  try {
    const qativacao = await prisma.qativacao.count({
      where: {
        data_status: {
          lte: new Date(data_final).toISOString(),
          gte: new Date(data_inicial).toISOString(),
        },
        AND: [
          {
            ativacao_id: 2,
          },
        ],
      },
    });
    return res.json(qativacao);
  } catch (error) {
    return res.send(error);
  }
};
export const getClienteDataAtivado = async (req: Request, res: Response) => {
  try {
    const count = await prisma.qativacao.count({
      where: { ativacao_id: 1 },
      select: { data_status: true },
    });
    return res.status(201).json(count);
  } catch (error) {
    return res.send(error);
  }
};
export const getClienteDataDesativado = async (req: Request, res: Response) => {
  try {
    const count = await prisma.qativacao.count({
      where: { ativacao_id: 2 },
      select: { data_status: true },
    });
    return res.status(201).json(count);
  } catch (error) {
    return res.send(error);
  }
};

export const getDataGroupTwoParsa = async (req: Request, res: Response) => {
  const { data_inicial } = req.body;
  const { data_final } = req.body;
  const { parceiro_id } = req.params;
  try {
    const qativacao = await prisma.qativacao.count({
      where: {
        data_status: {
          lte: new Date(data_final).toISOString(),
          gte: new Date(data_inicial).toISOString(),
        },
        AND: [
          {
            parceiroId: Number(parceiro_id),
            ativacao_id: 2,
          },
        ],
      },
    });
    return res.json(qativacao);
  } catch (error) {
    return res.send(error);
  }
};
