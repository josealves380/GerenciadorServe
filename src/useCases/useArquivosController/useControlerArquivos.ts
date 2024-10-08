import { Request, Response } from "express";

const fs = require("fs/promises");
const path = require("path");

export const BuscaArquivos = async (req: Request, res: Response) => {
  const { cnpj } = req.params;
  try{
    fs.readdir( 
      path.join(
        "/",
        "home",
        "fjinfor",
        "www",
        "html",
        "modulosiad",
        "front",
        "public",
        "arquivos",
        `${cnpj}`
        )
        ).then((files: any) => {
          const acceptedExtensions = [".rar", ".xml", ".pdf", ".zip", ".txt"];
          
          const arquivos = files.filter((file: string) =>
          acceptedExtensions.includes(path.extname(file))
          );
          return res.json({arquivos});
          //C:\Projetos\GerenciadorWeb\front\public\arquivos
          ///home/fjinfor/www/html/modulosiad/front
        });
      }catch(error){
        return res.send(error)
      }
};
