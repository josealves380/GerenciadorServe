import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";
import { createBoletoType } from "./schemaValidation";
//função para criar boleto
export const createBoleto = async (
  req: Request<createBoletoType, unknown, createBoletoType>,
  res: Response
) => {
  const { cliente_id } = req.params;
  const { boleto_id } = req.params;
  const { parceiro_id } = req.params;
  const {
    valor_documento,
    data_vencimento,
    obs_corpo,
    n_fantasia,
    email,
    status,
    bairro,
    cep,
    cnpj,
    estado,
    ibge,
    rz_social,
    numero,
    cidade,
    endereco,
  } = req.body;
  try {
    const qtd = await prisma.qtdBoleto.create({
      data: {
        valor_documento,
        data_vencimento,
        obs_corpo,
        n_fantasia,
        email,
        status,
        bairro,
        cep,
        cnpj,
        estado,
        ibge,
        rz_social,
        numero,
        cidade,
        endereco,
        cliente_id: Number(cliente_id),
        boleto_id: Number(boleto_id),
        parceiro_id: Number(parceiro_id),
      },
      include: {
        boleto: {
          select: {
            id: true,
          },
        },
      },
    });
    return res.status(201).json({
      valor_documento,
      data_vencimento,
      obs_corpo,
      n_fantasia,
      email,
      status,
      bairro,
      cep,
      cnpj,
      estado,
      ibge,
      rz_social,
      numero,
      cidade,
      endereco,
    });
  } catch (error) {
    return res.status(400).send("Falha ao criar o boleto do cliente");
  }
};
//criar boleto para o parceiro
export const createBoletoParceiro = async (req: Request, res: Response) => {
  const { cliente_id } = req.params;
  const { boleto_id } = req.params;
  const { parceiro_id } = req.params;
  try {
    const { valor_documento, data_vencimento } = req.body;
    const qtd = await prisma.qtdBoleto.create({
      data: {
        valor_documento,
        data_vencimento,
        cliente_id: Number(cliente_id),
        boleto_id: Number(boleto_id),
        parceiro_id: Number(parceiro_id),
      },
      include: {
        boleto: {
          select: {
            id: true,
          },
        },
      },
    });
    return res.status(200).json({ qtd });
  } catch (error) {
    return res.status(400).send("Falha ao criar o boleto");
  }
};
//buscar boleto do parceiro
export const getBoleto = async (req: Request, res: Response) => {
  const { parceiro_id } = req.params;
  try {
    const boleto = await prisma.qtdBoleto.findMany({
      orderBy: { n_fantasia: "asc" },
      where: {
        status: "ativo",
        parceiro_id: Number(parceiro_id),
        NOT: [{ obs_corpo: "" }],
      },
    });
    return res.json(boleto);
  } catch (error) {
    return res.send(error);
  }
};
//buscar boleto unico
export const getBoletoOne = async (req: Request, res: Response) => {
  const { parceiro_id } = req.params;
  const { id } = req.params;
  try {
    const boleto = await prisma.qtdBoleto.findFirst({
      where: {
        status: "ativo",
        parceiro_id: Number(parceiro_id),
        id: Number(id),
      },
    });
    return res.json(boleto);
  } catch (error) {
    return res.send(error);
  }
};
//mudar os dados do boletos
export const updateBoleto = async (
  req: Request<createBoletoType, unknown, createBoletoType>,
  res: Response
) => {
  const { id } = req.params;

  try {
    const {
      valor_documento,
      data_vencimento,
      rz_social,
      obs_corpo,
      email,
      status,
    } = req.body;

    await prisma.qtdBoleto.update({
      where: {
        id: Number(id),
      },
      data: {
        valor_documento: parseFloat(
          valor_documento.toString().replace(",", ".")
        ),
        data_vencimento,
        rz_social,
        obs_corpo,
        email,
        status,
      },
    });
    return res.status(200).send({
      valor_documento,
      data_vencimento,
      rz_social,
      obs_corpo,
      email,
      status,
    });
  } catch (error) {
    return res
      .status(400)
      .send("Falha atualizar informações do boleto tente novamente");
  }
};

export const updateBoletoDados = async (
  req: Request<createBoletoType, unknown, createBoletoType>,
  res: Response
) => {
  const { id } = req.params;

  try {
    const { data_processamento, status, numero_documento } = req.body;

    await prisma.qtdBoleto.update({
      where: {
        id: Number(id),
      },
      data: {
        data_processamento,
        numero_documento,
        status,
      },
    });
    return res.status(200).send({
      data_processamento,
      numero_documento,
      status,
    });
  } catch (error) {
    return res
      .status(400)
      .send("Falha atualizar informações do boleto tente novamente");
  }
};
export const updateStatusBoleto = async (
  req: Request<createBoletoType, unknown, createBoletoType>,
  res: Response
) => {
  const { id } = req.params;

  try {
    const { status } = req.body;

    await prisma.qtdBoleto.update({
      where: {
        id: Number(id),
      },
      data: {
        status,
      },
    });
    return res.status(200).send({
      status,
    });
  } catch (error) {
    return res
      .status(400)
      .send("Falha atualizar informações do boleto tente novamente");
  }
};
export const deleteBoleto = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const Data = await prisma.qtdBoleto.findUnique({
      where: {
        id: Number(id),
      },
    });
    const delBoleto = await prisma.qtdBoleto.delete({
      where: { id: Number(id) || undefined },
    });
    res.json(delBoleto);
  } catch (error) {
    res.json({ error: `Não foi possivel excluir esse boleto` });
  }
};

export const getBoletos = async (req: Request, res: Response) => {
  try {
    const boletos = await prisma.qtdBoleto.findMany();

    return res.json(boletos);
  } catch (error) {
    return res.send(error);
  }
};

export const getBoletosEnviados = async (req: Request, res: Response) => {
  try {
    const boletos = await prisma.qtdBoleto.findMany({
      where: {
        status: "enviado",
      },
    });

    return res.json(boletos);
  } catch (error) {
    return res.send(error);
  }
};
export const getBoletosVencidos = async (req: Request, res: Response) => {
  try {
    const boletos = await prisma.qtdBoleto.findMany({
      where: {
        status: "Vencida",
      },
      include: {
        Cliente: {
          select: {
            bloqueado: true,
            cnpj: true,
          },
        },
      },
    });

    return res.json(boletos);
  } catch (error) {
    return res.send(error);
  }
};

export const CountBoletos = async (req: Request , res: Response) =>{
  try{
    
    const boletos =await prisma.qtdBoleto.count()
    return res.json(boletos)
  }catch(error){
    return res.send(error)
  }

}
export const getQtdboleto = async (req: Request, res: Response) => {
  const {mes} = req.body;
  try {
    const qtdboleto = await prisma.qtdBoleto.count({
      where: {
        data_vencimento: {contains: mes}
        },
    });
    return res.json(qtdboleto);
  } catch (error) {
    return res.send(error);
  }
};
export const getQtdboletoCliente = async (req: Request, res: Response) => {
  const {cnpj} = req.params;
  try {
    const qtdboleto = await prisma.qtdBoleto.count({
      where: {
        cnpj: {contains:cnpj}
        },
    });
    return res.json(qtdboleto);
  } catch (error) {
    return res.send(error);
  }
};



