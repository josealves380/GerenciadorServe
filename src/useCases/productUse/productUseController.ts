import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { createProductType } from "./productSchemaValidation";

export const createProduct = async (
  req: Request<unknown, unknown, createProductType>,
  res: Response
) => {
  try {
    const { nome, valor } = req.body;
    await prisma.produto.create({
      data: {
        nome,
        valor,
      },
    });
    return res.status(201).send({
      nome,
      valor,
    });
  } catch (error) {
    return res.status(400).send("Falha ao criar produto");
  }
};
export const getProduto = async (req: Request, res: Response) => {
  const produto = await prisma.produto.findMany();

  return res.json(produto);
};
export const getValorProduto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const produto = await prisma.produto.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        valor: true,
        id: true,
      },
    });

    return res.json(produto);
  } catch (error) {
    return res.send(error);
  }
};

export const sumCliente = async (req: Request, res: Response) => {
  try {
    const produtoCliente = await prisma.produto.groupBy({
      by: ["nome"],
      _sum: { valor: true },
    });
    return res.json(produtoCliente);
  } catch (error) {
    return res.send(error);
  }
};
