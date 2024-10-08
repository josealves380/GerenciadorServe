import { hash } from "bcrypt";
import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { createParceiroType } from "./parceiroSchema";

export const createParceiro = async (
  req: Request<unknown, unknown, createParceiroType>,
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
    await prisma.parceiro.create({
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

export const getParceiroId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const parceiro = await prisma.parceiro.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        cliente: {
          where: {
            parceiro_id: Number(id),
          },
        },
      },
    });

    return res.json(parceiro);
  } catch (error) {
    return res.send(error);
  }
};

export const getParceiro = async (req: Request, res: Response) => {
  try {
    const [...nome] = await prisma.parceiro.findMany({
      select: {
        nome: true,
        id: true,
      },
      where: {
        NOT: [{ ativo: false }],
      },
    });

    return res.json(nome);
  } catch (error) {
    return res.send(error);
  }
};

export const getParceiroIdNumber = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const parceiro = await prisma.parceiro.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
      },
    });

    return res.json(parceiro);
  } catch (error) {
    return res.send(error);
  }
};
export const getParceiroIdPut = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const parceiro = await prisma.parceiro.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
      },
    });

    return res.json(parceiro);
  } catch (error) {
    return res.send(error);
  }
};

export const getAllParceiro = async (req: Request, res: Response) => {
  try {
    const parceiro = await prisma.parceiro.findMany();

    return res.json(parceiro);
  } catch (error) {
    return res.send(error);
  }
};
export const getParceiroDesativado = async (req: Request, res: Response) => {
  try {
    const count = await prisma.parceiro.count({ where: { ativo: false } });
    return res.status(201).json(count);
  } catch (error) {
    return res.send(error);
  }
};
export const getParceiroAtivado = async (req: Request, res: Response) => {
  try {
    const count = await prisma.parceiro.count({ where: { ativo: true } });
    return res.status(201).json(count);
  } catch (error) {
    return res.send(error);
  }
};

export const parceiroBLoqueado = async (req: Request, res: Response) => {
  const { searchString } = req.query;
  try {
    const or: Prisma.InputJsonObject = searchString
      ? {
          OR: [
            { name: { contains: searchString as string } },
            { cnpj: { contains: searchString as string } },
          ],
        }
      : {};

    const parceiro = await prisma.parceiro.findMany({
      where: {
        bloqueio: true,
        ...or,
      },
    });
    res.json(parceiro);
  } catch (error) {
    return res.send(error);
  }
};

export const parceiroUpdate = async (req: Request, res: Response) => {
  try {
    const { id, email, nome, cnpj, rz_social, telefone } = req.body;

    await prisma.parceiro.update({
      where: {
        id,
      },
      data: {
        nome,
        email,
        cnpj,
        rz_social,
        telefone,
      },
    });
    return res.status(201).send({ email, cnpj, nome, rz_social, telefone });
  } catch (error) {
    return res
      .status(400)
      .send("Falha atualizar informações do parceiro tente novamente");
  }
};

export const parceiroPutId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const parceiroData = await prisma.parceiro.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        ativo: true,
      },
    });
    const updatedParceiro = await prisma.parceiro.update({
      where: { id: Number(id) || undefined },
      data: { ativo: !parceiroData?.ativo },
    });
    res.json(updatedParceiro);
  } catch (error) {
    res.json({ error: `Não existe parceiro com esse id${id}` });
  }
};
export const parceiroPutIdBloqueado = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const parceiroData = await prisma.parceiro.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        bloqueio: true,
      },
    });
    const updatedParceiro = await prisma.parceiro.update({
      where: { id: Number(id) || undefined },
      data: { bloqueio: !parceiroData?.bloqueio },
    });
    res.json(updatedParceiro);
  } catch (error) {
    res.json({ error: `Não existe parceiro com esse id${id}` });
  }
};
export const getSeachParceiro = async (req: Request, res: Response) => {
  const { consulta } = req.body;
  try {
    const cliente = await prisma.parceiro.findMany({
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

export const parceiroUpdateDados = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const {
      email,
      cnpj,
      rz_social,
      insc_estadual,
      telefone,
      cidade,
      bairro,
      cep,
      endereco,
      uf,
      ibge,
      numero,
      n_fantasia,
      nome,
    } = req.body;

    await prisma.parceiro.update({
      where: {
        id: Number(id),
      },
      data: {
        email,
        cnpj,
        rz_social,
        insc_estadual,
        telefone,
        cidade,
        bairro,
        cep,
        endereco,
        uf,
        ibge,
        numero,
        n_fantasia,
        nome,
      },
    });
    return res.status(201).send({
      email,
      cnpj,
      rz_social,
      insc_estadual,
      telefone,
      cidade,
      bairro,
      cep,
      endereco,
      uf,
      ibge,
      numero,
      n_fantasia,
      nome,
    });
  } catch (error) {
    return res
      .status(400)
      .send("Falha atualizar informações do parceiro tente novamente");
  }
};

export const getParceiroUp = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const parceiroUpd = await prisma.parceiro.findUnique({
      where: {
        id: Number(id),
      },
    });
    return res.json(parceiroUpd);
  } catch (error) {
    return res.send(error);
  }
};
export const getSeachClienteParceiro = async (req: Request, res: Response) => {
  const { consulta } = req.body;
  const { id } = req.params;
  try {
    const parceiro = await prisma.parceiro.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        cliente: {
          take: 15,
          orderBy: { rz_social: "asc" },
          where: {
            OR: [
              {
                rz_social: {
                  contains: consulta,
                },
              },
              {
                OR: [
                  {
                    cnpj: {
                      contains: consulta,
                    },
                  },
                  {
                    OR: [
                      {
                        n_fantasia: {
                          contains: consulta,
                        },
                      },
                      {
                        OR: [
                          {
                            email: {
                              contains: consulta,
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      },
    });
    return res.json([parceiro]);
  } catch (error) {
    return res.send(error);
  }
};

export const getClientePorParceiro = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { parceiro_id } = req.params;
  try {
    const clienteparceiro = await prisma.parceiro.findMany({
      where: {
        id: Number(id),
      },
      include: {
        cliente: {
          where: {
            parceiro_id: Number(parceiro_id),
          },
          select: {
            id: true,
            ativo: true,
            bairro: true,
            cep: true,
            cidade: true,
            cnpj: true,
            email: true,
            insc_estadual: true,
            n_fantasia: true,
            name: true,
            bloqueado: true,
            nome_contato: true,
            numero: true,
            rz_social: true,
            uf: true,
            telefone: true,
            data_pag: true,
            gera_online: true,
            geraBoleto: true,
            valor_mensal: true,
            parceiro_id: true,
          },
        },
      },
    });
    return res.json(clienteparceiro);
  } catch (error) {
    return res.send(error);
  }
};
export const getClientePorParceiroPagar = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { parceiro_id } = req.params;
  try {
    const clienteparceiro = await prisma.parceiro.findMany({
      where: {
        id: Number(id),
      },
      include: {
        cliente: {
          where: {
            parceiro_id: Number(parceiro_id),
            statusCliente: "pagar",
          },
          select: {
            id: true,
            ativo: true,
            bairro: true,
            cep: true,
            cidade: true,
            cnpj: true,
            email: true,
            insc_estadual: true,
            n_fantasia: true,
            name: true,
            bloqueado: true,
            nome_contato: true,
            numero: true,
            rz_social: true,
            uf: true,
            telefone: true,
            data_pag: true,
            gera_online: true,
            geraBoleto: true,
            valor_mensal: true,
            parceiro_id: true,
          },
        },
      },
    });
    return res.json(clienteparceiro);
  } catch (error) {
    return res.send(error);
  }
};
export const getClientePorParceiroPago = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { mes } = req.body;
  try {
    const clienteparceiro = await prisma.parceiro.findMany({
      where: {
        id: Number(id),
      },
      include: {
        cliente: {
          where: {
            NOT: [{ statusCliente: "pagar" }],
            AND: { NOT: [{ statusCliente: "pagando" }] },
          },
        },
      },
    });
    return res.json(clienteparceiro);
  } catch (error) {
    return res.send(error);
  }
};
//função para gerar boletos dos clientes
export const ClientePorParceiro = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { parceiro_id } = req.params;
  const { dia } = req.params;
  try {
    const clienteparceiro = await prisma.parceiro.findMany({
      where: {
        id: Number(id),
        geraBoleto: true,
      },
      include: {
        cliente: {
          //take: 1,
          where: {
            parceiro_id: Number(parceiro_id),
            data_pag: dia,
            ativo: true,
            AND: [{ NOT: { geraBoleto: false } }],
          },
          select: {
            id: true,
            ativo: true,
            bairro: true,
            cep: true,
            cidade: true,
            cnpj: true,
            email: true,
            insc_estadual: true,
            n_fantasia: true,
            name: true,
            endereco: true,
            ibge: true,
            bloqueado: true,
            nome_contato: true,
            numero: true,
            rz_social: true,
            uf: true,
            telefone: true,
            data_pag: true,
            gera_online: true,
            geraBoleto: true,
            valor_mensal: true,
            perc_mensal: true,
            parceiro_id: true,
          },
        },
      },
    });
    return res.json(clienteparceiro);
  } catch (error) {
    return res.send(error);
  }
};

export const parceiroValorCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { valor_cliente } = req.body;

    await prisma.parceiro.update({
      where: {
        id: Number(id),
      },

      data: {
        valor_cliente,
      },
    });
    return res.status(201).send({
      valor_cliente,
    });
  } catch (error) {
    return res.status(400).send("Falha atualizar valor pago por cliente");
  }
};

export const getClienteValor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const valorparceiro = await prisma.parceiro.findMany({
      where: {
        id: Number(id),
      },
      select: {
        valor_cliente: true,
      },
    });
    return res.json(valorparceiro);
  } catch (error) {
    return res.send(error);
  }
};

export const userParceiroFind = async (req: Request, res: Response)=>{
  const ultimo = await prisma.parceiro.findMany({
  orderBy:{id: "desc"},
  select: {id: true}
  })

  return res.send(ultimo)
} 

export const parceirouserid = async (req: Request, res: Response)=>{
  const {parceiro_id} = req.params;
try{

  const parceiro = await prisma.parceiro.findFirst({
    where:{
      id: Number(parceiro_id)
    },include:{user: {where: {
      parceiro_id: Number(parceiro_id),
      nivel: "2"
    }}}
  })
  return res.send(parceiro)
}catch(error){
  return res.send("Erro ao consultar usuário parceiro verifique se ele possui acesso a f2b")
}
}