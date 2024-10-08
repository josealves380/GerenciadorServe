import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { CreateF2bType } from "./useConfigValidation";

export const createConfigF2b = async (
  req: Request<unknown, unknown, CreateF2bType>,
  res: Response 
) => {
  try {
    const { basic, salario, user_id } = req.body;

    await prisma.configF2b.create({
      data: {
        basic,
        salario: parseFloat(salario.toString().replace(",", ".")),
        user_id,
      },
      include: {
        user: true,
      },
    });
    return res.status(201).send({
      basic,
      salario,
      user_id,
    });
  } catch (error) {
    return res.status(400).send("Falha ao criar config tente novamente");
  }
};

export const getConfigF2b = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  try {
    const configF2b = await prisma.configF2b.findMany({
      where: {
        user_id: String(user_id),
      },
    });
    return res.json(configF2b);
  } catch (error) {
    return res.send(error);
  }
};

export const ConfigF2bput = async (
  req: Request<CreateF2bType>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const { salario } = req.body;
    await prisma.configF2b.update({
      where: {
        id: Number(id),
      },
      data: {
        salario,
      },
    });
    return res.status(201).send({
      salario,
    });
  } catch (error) {
    return res
      .status(400)
      .send("Falha atualizar status de pagamento do cliente tente novamente");
  }
};

export const getConfigSalario = async (req: Request, res: Response) => {
  try {
    const config = await prisma.configF2b.findMany();

    return res.json(config);
  } catch (error) {
    return res.send(error);
  }
};
