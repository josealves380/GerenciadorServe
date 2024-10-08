import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";
import { Request, Response } from "express";

import { prisma } from "../../lib/prisma";
import {
  CreateClientType,
  clienteIdClientType,
  updateClientType,
} from "./clientSchemaVaidation";

//função para criar cliente
export const createCLiente = async (
  req: Request<unknown, unknown, CreateClientType>,
  res: Response
) => {
  try {
    const {
      name,
      email,
      senha,
      n_fantasia,
      insc_estadual,
      cnpj,
      rz_social,
      cep,
      cidade,
      bairro,
      endereco,
      numero,
      telefone,
      tel_contato,
      data_impl,
      data_pag,
      uf,
      ibge,
      tecnico,
      id,
      perc_mensal,
      valor_mensal,
      tipo_envio,
      basic,
    } = req.body;
    const passwordHash = await hash(senha, 8);
    await prisma.cliente.create({
      data: {
        name,
        email,
        senha: passwordHash,
        insc_estadual,
        ativo: true,
        bloqueado: false,
        gera_online: false,
        geraBoleto: true,
        cnpj,
        rz_social,
        n_fantasia,
        cep,
        cidade,
        bairro,
        endereco,
        numero,
        telefone,
        tel_contato: null || "",
        data_impl,
        data_pag,
        uf,
        ibge,
        tecnico,
        perc_mensal: parseFloat(perc_mensal.toString().replace(",", ".")),
        valor_mensal: parseFloat(valor_mensal.toString().replace(",", ".")),
        tipo_envio,
        basic,
        paceiro: {
          connect: {
            id,
          },
        },
      },
    });
    return res.status(201).send({
      name,
      email,
      senha,
      insc_estadual,
      cnpj,
      rz_social,
      cep,
      bairro,
      endereco,
      numero,
      uf,
      telefone,
      ibge,
      perc_mensal,
      valor_mensal,
      tipo_envio,
      basic,
    });
  } catch (error) {
    return res.status(400).send("Falha ao criar user tente novamente");
  }
};
//função para contar todos clientes
export const countCLiente = async (req: Request, res: Response) => {
  try {
    const count = await prisma.cliente.findMany({
      include: {
        _count: {},
      },
    });
    return res.json(count);
  } catch (error) {
    return res.send(error);
  }
};

export const getClienteCountAll = async (req: Request, res: Response) => {
  try {
    const count = await prisma.cliente.count();
    return res.status(201).json(count);
  } catch (error) {
    return res.send(error);
  }
};
//função para contar clientes ativos
export const getClienteCount = async (req: Request, res: Response) => {
  try {
    const count = await prisma.cliente.count({ where: { ativo: true } });
    return res.status(201).json(count);
  } catch (error) {
    return res.send(error);
  }
};
//função para contar cliente ativos do parceiro
export const getClienteCountParceiro = async (req: Request, res: Response) => {
  const { parceiro_id } = req.params;
  try {
    const count = await prisma.cliente.count({
      where: {
        parceiro_id: Number(parceiro_id),
        ativo: true,
      },
    });
    return res.status(201).json(count);
  } catch (error) {
    return res.send(error);
  }
};
//função para contar cliente desativados do parceiro
export const getClienteCountParceiroDesativado = async (
  req: Request,
  res: Response
) => {
  const { parceiro_id } = req.params;
  try {
    const count = await prisma.cliente.count({
      where: {
        parceiro_id: Number(parceiro_id),
        ativo: false,
      },
    });
    return res.status(201).json(count);
  } catch (error) {
    return res.send(error);
  }
};
export const getClienteCountParceiroBloqueado = async (
  req: Request,
  res: Response,
) => {
  const { parceiro_id } = req.params;
  try {
    const count = await prisma.cliente.count({
      where: {
        parceiro_id: Number(parceiro_id),
        bloqueado: true,
      },
    });
    return res.status(201).json(count);
  } catch (error) {
    return res.send(error);
  }
};

export const getClienteCountParceiroDesbloqueado = async (
  req: Request,
  res: Response
) => {
  const { parceiro_id } = req.params;
  try {
    const count = await prisma.cliente.count({
      where: {
        parceiro_id: Number(parceiro_id),
        bloqueado: false,
      },
    });
    return res.status(201).json(count);
  } catch (error) {
    return res.send(error);
  }
};
//função para contar clientes Desativados
export const getClienteCountDesativado = async (
  req: Request,
  res: Response
) => {
  try {
    const count = await prisma.cliente.count({ where: { ativo: false } });
    return res.status(201).json(count);
  } catch (error) {
    return res.send(error);
  }
};

export const getClienteCountBloq = async (
  req: Request,
  res: Response
) => {
  try {
    const count = await prisma.cliente.count({ where: { bloqueado: true } });
    return res.status(201).json(count);
  } catch (error) {
    return res.send(error);
  }
};
export const getClienteCountDesbloq= async (
  req: Request,
  res: Response
) => {
  try {
    const count = await prisma.cliente.count({ where: { bloqueado: false } });
    return res.status(201).json(count);
  } catch (error) {
    return res.send(error);
  }
};
export const getClienteCountGeraBoleto = async (
  req: Request,
  res: Response
) => {
  try {
    const count = await prisma.cliente.count({ where: { geraBoleto: true } });
    return res.status(201).json(count);
  } catch (error) {
    return res.send(error);
  }
};
export const getClienteCountGeraBoletoFalse = async (
  req: Request,
  res: Response
) => {
  try {
    const count = await prisma.cliente.count({ where: { geraBoleto: false } });
    return res.status(201).json(count);
  } catch (error) {
    return res.send(error);
  }
};
//função para filtrar os clientes por pesquisa
export const filterCliente = async (req: Request, res: Response) => {
  try {
    const clientes = await prisma.cliente.findMany();
    const search = String(req.query.search);

    const filteredCLiente = search
      ? clientes.filter((cliente) => cliente.statusCliente)
      : clientes;

    return res.json(filteredCLiente);
  } catch (error) {
    return res.send(error);
  }
};

//função para consultar os clientes
export const getCliente = async (req: Request, res: Response) => {
  try {
    const cliente = await prisma.cliente.findMany({
      take: 100,
      orderBy: { rz_social: "asc" },
      select: {
        id: true,
        cnpj: true,
        email: true,
        name: true,
        statusCliente: true,
        ativo: true,
        n_fantasia: true,
        rz_social: true,
        telefone: true,
        cidade: true,
        tel_contato: true,
        parceiro_id: true,
        bloqueado: true,
        chave: true,
        gera_online: true,
        uf: true,
        data_impl: true,
        data_pag: true,
        valor_mensal: true,
        geraBoleto: true,
        tipo_envio: true,
        bairro: true,
        cep: true,
        endereco: true,
        numero: true,
        ibge: true,
        paceiro: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
    return res.json(cliente);
  } catch (error) {
    return res.send(error);
  }
};
export const getClientePorPagina = async (req: Request, res: Response) => {
  const { pagina } = req.body;
  const cliente = await prisma.cliente.findMany({
    skip: pagina,
    take: 100,
    orderBy: { rz_social: "asc" },
    select: {
      id: true,
      cnpj: true,
      email: true,
      name: true,
      statusCliente: true,
      ativo: true,
      n_fantasia: true,
      rz_social: true,
      telefone: true,
      cidade: true,
      tel_contato: true,
      parceiro_id: true,
      bloqueado: true,
      chave: true,
      gera_online: true,
      uf: true,
      data_impl: true,
      data_pag: true,
      valor_mensal: true,
      geraBoleto: true,
      tipo_envio: true,
      bairro: true,
      cep: true,
      endereco: true,
      numero: true,
      ibge: true,
      paceiro: {
        select: {
          id: true,
          nome: true,
        },
      },
    },
  });
  return res.json(cliente);
};
//função para contar clientes por cidade
export const getClienteCity = async (req: Request, res: Response) => {
  const { city } = req.body;
  const cliente = await prisma.cliente.count({
    where: {
      cidade: city,
      NOT: { ativo: false },
    },
  });
  return res.json(cliente);
};
//função paraa consultar por filtro os clientes
export const getSeachCliente = async (req: Request, res: Response) => {
  const { consulta } = req.body;
  try {
    const cliente = await prisma.cliente.findMany({
      take: 100,
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
                          startsWith: consulta,
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
      include: {
        paceiro: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
    return res.json(cliente);
  } catch (error) {
    return res.send(error);
  }
};

export const seachCliente = async (req: Request, res: Response) => {
  const { searchString, skip, take, orderBy } = req.query;
  try {
    const or: Prisma.InputJsonObject = searchString
      ? {
          OR: [
            { name: { contains: searchString as string } },
            { cnpj: { contains: searchString as string } },
          ],
        }
      : {};

    const clientes = await prisma.cliente.findMany({
      where: {
        ativo: true,
        ...or,
      },
      include: { paceiro: true },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: {
        data_impl: orderBy as Prisma.SortOrder,
      },
    });
    res.json(clientes);
  } catch (error) {
    return res.send(error);
  }
};

export const clienteBLoqueado = async (req: Request, res: Response) => {
  const { searchString, skip, take, orderBy } = req.query;
  try {
    const or: Prisma.InputJsonObject = searchString
      ? {
          OR: [
            { name: { contains: searchString as string } },
            { cnpj: { contains: searchString as string } },
          ],
        }
      : {};
    //função para consultar clientes bloqueados
    const clientes = await prisma.cliente.findMany({
      where: {
        bloqueado: true,
        ...or,
      },
      include: { paceiro: true },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: {
        data_impl: orderBy as Prisma.SortOrder,
      },
    });
    res.json(clientes);
  } catch (error) {
    return res.send(error);
  }
};
//função para editar os dados dos clientes
export const clienteUpdate = async (
  req: Request<clienteIdClientType, updateClientType>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const {
      email,
      name,
      cnpj,
      rz_social,
      insc_estadual,
      tel_contato,
      telefone,
      cidade,
      bairro,
      cep,
      endereco,
      uf,
      ibge,
      n_fantasia,
      nome,
      numero,
      perc_mensal,
      valor_mensal,
      data_pag,
      tipo_envio,
    } = req.body;

    await prisma.cliente.update({
      where: {
        id: Number(id),
      },
      data: {
        email,
        name,
        cnpj,
        rz_social,
        insc_estadual,
        tel_contato,
        telefone,
        cidade,
        bairro,
        cep,
        endereco,
        uf,
        ibge,
        numero,
        n_fantasia,
        perc_mensal: parseFloat(perc_mensal.toString().replace(",", ".")),
        valor_mensal: parseFloat(valor_mensal.toString().replace(",", ".")),
        data_pag,
        tipo_envio,
        paceiro: { update: { nome } },
      },
    });
    return res.status(201).send({
      email,
      cnpj,
      name,
      rz_social,
      insc_estadual,
      tel_contato,
      telefone,
      cidade,
      bairro,
      cep,
      endereco,
      uf,
      ibge,
      n_fantasia,
      numero,
      nome,
      perc_mensal,
      valor_mensal,
      data_pag,
      tipo_envio,
    });
  } catch (error) {
    return res
      .status(400)
      .send("Falha atualizar informações do cliente tente novamente");
  }
};
//função para editar percentual mensal e o valor mensal pago
export const clienteUpdatePerc = async (
  req: Request<clienteIdClientType, updateClientType>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const { perc_mensal, valor_mensal } = req.body;
    await prisma.cliente.update({
      where: {
        id: Number(id),
      },
      data: {
        perc_mensal: parseFloat(perc_mensal.toString().replace(",", ".")),
        valor_mensal: parseFloat(valor_mensal.toString().replace(",", ".")),
      },
    });
    return res.status(201).send({
      perc_mensal,
      valor_mensal,
    });
  } catch (error) {
    return res
      .status(400)
      .send("Falha atualizar informações do cliente tente novamente");
  }
};
//função para editar o status de pagamento do cliente
export const clienteUpdateStatus = async (
  req: Request<clienteIdClientType, updateClientType>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const { statusCliente } = req.body;
    await prisma.cliente.update({
      where: {
        id: Number(id),
      },
      data: {
        statusCliente,
      },
    });
    return res.status(201).send({
      statusCliente,
    });
  } catch (error) {
    return res
      .status(400)
      .send("Falha atualizar status de pagamento do cliente tente novamente");
  }
};
//função para editar a chave do cliente
export const clienteChave = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { chave } = req.body;

    await prisma.cliente.update({
      where: {
        id: Number(id),
      },
      data: {
        chave,
      },
    });
    return res.status(201).send({ chave });
  } catch (error) {
    return res
      .status(400)
      .send("Falha atualizar informações do cliente tente novamente");
  }
};

//
export const clientePutId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const clienteData = await prisma.cliente.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        ativo: true,
      },
    });
    const updatedCliente = await prisma.cliente.update({
      where: { id: Number(id) || undefined },
      data: { ativo: !clienteData?.ativo },
    });
    res.json(updatedCliente);
  } catch (error) {
    res.json({ error: `Não existe cliente com esse id${id}` });
  }
};
//bloqueia o cliente
export const clientePutIdBloqueado = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const clienteData = await prisma.cliente.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        bloqueado: true,
      },
    });
    const updatedCliente = await prisma.cliente.update({
      where: { id: Number(id) || undefined },
      data: { bloqueado: !clienteData?.bloqueado },
    });
    res.json(updatedCliente);
  } catch (error) {
    res.json({ error: `Não existe cliente com esse id${id}` });
  }
};
//Permite gerar chave para o cliente
export const clientePutIdGera = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const clienteData = await prisma.cliente.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        gera_online: true,
      },
    });
    const updatedCliente = await prisma.cliente.update({
      where: { id: Number(id) || undefined },
      data: { gera_online: !clienteData?.gera_online },
    });
    res.json(updatedCliente);
  } catch (error) {
    res.json({ error: `Não existe cliente com esse id${id}` });
  }
};
//Permite gerar boleto para o cliente
export const clientePutGeraBoleto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const clienteData = await prisma.cliente.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        geraBoleto: true,
        ativo: true,
      },
    });
    const updatedCliente = await prisma.cliente.update({
      where: { id: Number(id) || undefined },
      data: { geraBoleto: !clienteData?.geraBoleto },
    });
    res.json(updatedCliente);
  } catch (error) {
    res.json({ error: `Não existe cliente com esse id${id}` });
  }
};
export const deleteCliente = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const clienteData = await prisma.cliente.findUnique({
      where: {
        id: Number(id),
      },
    });
    const updatedCliente = await prisma.cliente.delete({
      where: { id: Number(id) || undefined },
    });
    res.json(updatedCliente);
  } catch (error) {
    res.json({ error: `Não foi possivel excluir esse cliente` });
  }
};

export const getClienteUp = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const clienteUpd = await prisma.cliente.findUnique({
      where: {
        id: Number(id),
       
      },
      include: {
        paceiro: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
    return res.json(clienteUpd);
  } catch (error) {
    return res.send(error);
  }
};

export const getClienteAtivado = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const clienteAtivo = await prisma.cliente.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        financeiro: {
          select: {
            valor: true,
          },
        },
        quantidade: { select: { produto: { select: { valor: true } } } },
      },
    });
    return res.json(clienteAtivo);
  } catch (error) {
    return res.send(error);
  }
};
//Busca os ultimos 10 clientes
export const getUltimoCLiente = async (req: Request, res: Response) => {
  try {
    const ultCliente = await prisma.cliente.findMany({
      take: 10,
      orderBy: { id: "desc" },
    });

    return res.json(ultCliente);
  } catch (error) {
    return res.send(error);
  }
};

export const getSeachClienteSemExpirar = async (
  req: Request,
  res: Response
) => {
  try {
    const { consulta } = req.body;
    const cliente = await prisma.cliente.findMany({
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
      include: {
        paceiro: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
    return res.json(cliente);
  } catch (error) {
    return res.send(error);
  }
};

export const getSeachClienteSemExpira = async (req: Request, res: Response) => {
  const { consulta } = req.body;
  try {
    const cliente = await prisma.cliente.findMany({
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
      select: {
        ativo: true,
        bloqueado: true,
        cnpj: true,
        gera_online: true,
      },
    });
    return res.json(cliente);
  } catch (error) {
    return res.send(error);
  }
};
//busca a data que o cliente foi ativado ou desativado
export const getDataAtivaDesativa = async (req: Request, res: Response) => {
  const { cliente_id } = req.params;
  try {
    const cliente = await prisma.cliente.findUnique({
      where: {
        id: Number(cliente_id),
      },
      include: {
        qativacao: {
          include: {
            ativacao: {
              select: {
                status: true,
              },
            },
          },
          orderBy: { id: "desc" },
        },
      },
    });

    return res.json(cliente);
  } catch (error) {
    return res.send(error);
  }
};
//Busca a quantidade de cliente por parceiro
export const getCountCLienteParceiro = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cliente = await prisma.cliente.count({
      where: { parceiro_id: Number(id) },
    });
    return res.json(cliente);
  } catch (error) {
    return res.send(error);
  }
};
//Busca os cliente para gerar boletos
export const getGerarBoletos = async (req: Request, res: Response) => {
  try {
    const cliente = await prisma.cliente.findMany();
    return res.json(cliente);
  } catch (error) {
    return res.send(error);
  }
};
//get todas as cidades
export const getCity = async (req: Request, res: Response) => {
  try {
    const [{ cidade }] = await prisma.cliente.findMany({
      where: { ativo: true, cidade: { not: "" } },
    });
    return res.json({ cidade });
  } catch (error) {
    return res.send(error);
  }
};

export const getClienteCnpj = async (req: Request, res: Response) => {
  const { cnpj } = req.params;
  try {
    const cliente = await prisma.cliente.findMany({
      where: { cnpj: String(cnpj) },
    });
    return res.json({ cliente });
  } catch (error) {
    return res.send(error);
  }
};

export const updateBasicCLiente = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { basic } = req.body;

    await prisma.cliente.update({
      where: {
        id: Number(id),
      },
      data: {
        basic,
      },
    });
    return res.status(200).send({
      basic,
    });
  } catch (error) {
    return res.status(400).send("Falha atualizar basic do cliente");
  }
};

export const ValorMensalput = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { valor_mensal } = req.body;
    await prisma.cliente.update({
      where: {
        id: Number(id),
      },
      data: {
        valor_mensal: parseFloat(valor_mensal.toString().replace(",", ".")),
      },
    });
    return res.status(201).send({
      valor_mensal,
    });
  } catch (error) {
    return res
      .status(400)
      .send("Falha atualizar valor de pagamento do cliente tente novamente");
  }
};

export const getClienteValorMensal = async (req: Request, res: Response) => {
  try {
    const cliente = await prisma.cliente.findMany({
      orderBy: { rz_social: "asc" },
      select: {
        id: true,
        perc_mensal: true,
        valor_mensal: true,
      },
    });
    return res.json(cliente);
  } catch (error) {
    return res.send(error);
  }
};

export const getStatusAtualizado = async (req: Request, res: Response) => {
  try {
    const cliente = await prisma.cliente.findMany({
      include: { paceiro: { select: { id: true, nome: true } } },
    });
    return res.json({ cliente });
  } catch (error) {
    return res.send(error);
  }
};
