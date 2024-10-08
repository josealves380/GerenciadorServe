import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";
import { createLoginType } from "./schemaValidation";

export const createLogin = async (
  req: Request<createLoginType>,
  res: Response
) => {
  const { login_id } = req.params;

  const { ip, user_id } = req.body;
  try {
    const login = await prisma.qtdLogin.create({
      data: {
        ip,
        user_id,
        login_id: Number(login_id),
      },
    });
    return res.status(201).json({
      login,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Falha ao registrar login");
  }
};

export const createLoginUrl = async (
  req: Request<createLoginType>,
  res: Response
) => {
  const { login_id } = req.params;
  const { ip, cliente_id, cnpj, nome } = req.body;
  try {
    const login = await prisma.qtdLogin.create({
      data: {
        ip,
        cnpj,
        nome,
        login_id: Number(login_id),
        cliente_id: Number(cliente_id),
      },
    });
    return res.status(201).json({
      ip,
      login_id,
      cliente_id,
      cnpj,
      nome,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Falha ao registrar login");
  }
};
export const GetLogin = async (req: Request, res: Response) => {
  try {
    const login = await prisma.qtdLogin.findMany({
      take: 10,
      orderBy:{ data: "desc"}
    });

    return res.json(login);
  } catch (error) {
    return res.send(error);
  }
};

export const GetLoginCnpj = async(req: Request, res: Response)=>{
  const {cnpj} = req.params
  try{
    const login = await prisma.qtdLogin.findMany({
      take: 10,
      orderBy: {data: "desc"},
      where:{cnpj: String(cnpj)}
    })
    return res.json(login)
  }catch(error){
    return res.send(error)
  }
}
