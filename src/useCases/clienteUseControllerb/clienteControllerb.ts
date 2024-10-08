import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";

export const getCityB = async (req: Request, res: Response) => {
  try {
    const [{ cidade }] = await prisma.cliente.findMany({
      where: { ativo: true, cidade: { not: "" } },
    });
    return res.json({ cidade });
  } catch (error) {
    return res.send(error);
  }
};

export const getClienteCnpjB = async (req: Request, res: Response) => {
  const { cnpj } = req.params;
  if (!cnpj) {
    return res.json("Necessário um cnpj");
  }
  if (cnpj) {
    try {
      const [{ n_fantasia }] = await prisma.cliente.findMany({
        where: { cnpj: String(cnpj) },
      });

      return res.json({ n_fantasia });
    } catch (error) {
      return res.send(error);
    }
  }
};

export const getClienteCnpjIdB = async (req: Request, res: Response) => {
  const { cnpj } = req.params;
  if (!cnpj) {
    return res.json("Necessário um cnpj");
  }
  if (cnpj) {
    try {
      const [{ id }] = await prisma.cliente.findMany({
        where: { cnpj: String(cnpj) },
      });

      return res.json({ id });
    } catch (error) {
      return res.send(error);
    }
  }
};

export const getClienteCnpjBasicB = async (req: Request, res: Response) => {
  const { cnpj } = req.params;
  if (!cnpj) {
    return res.json("Necessário um cnpj");
  }
  if (cnpj) {
    try {
      const [{ basic }] = await prisma.cliente.findMany({
        where: { cnpj: String(cnpj) },
      });

      return res.json({ basic });
    } catch (error) {
      return res.json({ error });
    }
  }
};

export const clienteUpdateContador = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { contador_id } = req.body;
    await prisma.cliente.update({
      where: {
        id: Number(id),
      },
      data: {
        contador_id,
      },
    });
    return res.status(201).send({
      contador_id,
    });
  } catch (error) {
    return res
      .status(400)
      .send("Falha atualizar status de pagamento do cliente tente novamente");
  }
};

export const getContadorCliente = async (req: Request, res: Response) => {
  const { cnpj } = req.params;
  if (!cnpj) {
    return res.json("Necessário um cnpj");
  }
  if (cnpj) {
    try {
      const [{ contador_id }] = await prisma.cliente.findMany({
        where: { cnpj: String(cnpj)}
      });

      return res.json({ contador_id });
    } catch (error) {
      return res.send(error);
    }
  }
};