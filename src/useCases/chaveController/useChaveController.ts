import { prisma } from "../../lib/prisma"
import { Response, Request } from "express";
import { CreateChave } from "./chavevalidation";

export const createChave= async(request: Request<CreateChave>, response: Response) =>{
  const {cliente_id} = request.params
  try{
    const {
      cnpj, 
      n_pdv,
      n_dav,
      tipo_sist
    } = request.body

//const cripto = new Crypto()
  await prisma.chave.create({
    data:{
      cnpj,
      n_pdv,
      n_dav,
      tipo_sist,
      cliente:{
        connect:{
        id: Number(cliente_id)
      }}
    }
  })
  return response.status(201).send({
    cnpj,
    n_pdv,
    n_dav,
    tipo_sist,
  })
}catch(error){
  console.log(error)
  return response.status(400).send("Falha ao criar produto")
}
}