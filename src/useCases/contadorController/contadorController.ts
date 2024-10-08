import { createContadorType } from "./schemaValidation";
import { hash } from "bcrypt";
import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

export const createContador = async (
  req: Request<unknown, unknown, createContadorType>,
  res: Response
) => {
  try {
    const {
      nome,
      email,
      senha,
      rz_social,
      n_fantasia,
      cnpj,
      insc_estadual,
      endereco,
      numero,
      bairro,
      cidade,
      uf,
      cep,
      telefone,
      ibge,
    } = req.body;
    const passwordHash = await hash(senha, 8);
    await prisma.contador.create({
      data: {
        nome,
        email,
        senha: passwordHash,
        ativo: true,
        bloqueio: false,
        cnpj,
        rz_social,
        insc_estadual,
        n_fantasia,
        cep,
        bairro,
        endereco,
        numero,
        cidade,
        uf,
        telefone,
        ibge,
      },
    });
    return res.status(201).send({
      nome,
      email,
      senha,
      cnpj,
      rz_social,
      n_fantasia,
      insc_estadual,
      cep,
      bairro,
      endereco,
      numero,
      uf,
      telefone,
      ibge,
    });
  } catch (error) {
    return res
      .status(400)
      .send(`Falha ao criar Parceiro tente novamente ${error}`);
  }
};
export const getAllContador = async (req: Request, res: Response) => {
  try {
    const contador = await prisma.contador.findMany();

    return res.json(contador);
  } catch (error) {
    return res.send(error);
  }
};

export const getSeachContador = async (req: Request, res: Response) => {
  const { consulta } = req.body;
  try {
    const cliente = await prisma.contador.findMany({
      where: {
        OR: [
          {
            rz_social: {
              startsWith: consulta,
            },
          },
          {
            OR: [
              {
                cnpj: {
                  startsWith: consulta,
                },
              },
              {
                OR: [
                  {
                    n_fantasia: {
                      startsWith: consulta,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    });
    return res.json(cliente);
  } catch (error) {
    return res.send(error);
  }
};

export const GetContador = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [{ Cliente }] = await prisma.contador.findMany({
      where: {
        id: Number(id),
      },
      include: {
        Cliente: {
          where: {
            contador_id: Number(id),
          },
        },
      },
    });
    return res.json(Cliente);
  } catch (error) {
    return res.send(error);
  }
};
export const ConnectCliente = async (
  req: Request<createContadorType>,
  res: Response
) => {
  const { id } = req.params;
  const { contador_id } = req.params;
  if (contador_id) {
    try {
      const clienteData = await prisma.contador.findUnique({
        where: {
          id: Number(id),
        },
      });
      const contador = await prisma.contador.update({
        where: { id: Number(id) },
        data: {
          Cliente: {
            connect: {
              id: Number(id),
              contador_id: Number(contador_id),
            },
          },
        },
      });
      return res.json(contador);
    } catch (error) {
      return res.send(error);
    }
  }
};

export const getcontadoremail = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const contador = await prisma.contador.findMany({
      where: { email: String(email) },
    });

    return res.json(contador);
  } catch (error) {
    return res.send(error);
  }
};

export const getContadorId = async(req: Request<createContadorType>, res: Response) =>{
  const {id} = req.params;

  try{
    const contador = await prisma.contador.findUnique({
      where: { id: Number(id)}
    })
    return res.send(contador)
  }catch(error){
    return res.send("Erro a consultar o contador")
  } 
}