import { Router } from "express";
import {
 
  clienteUpdateContador,
  getCityB,
  getClienteCnpjB,
  getClienteCnpjBasicB,
  getClienteCnpjIdB,
  getContadorCliente,
} from "./useCases/clienteUseControllerb/clienteControllerb";
import {
  GetLoginCnpj,
  createLogin,
  createLoginUrl,
} from "./useCases/loginController/loginController";

const routerb = Router();
import {
  createSuporte,
  getSuporte,
  upAtendenteSuporte,
  upSolucaoSuporte,
  upSuporte,
} from "./useCases/suportUseController/suporteController";
import { suporteBody } from "./useCases/suportUseController/suporteSchemaVaidation";
import { schemaValidation } from "./useCases/clienteUseController/schemaValidation";
import { BuscaArquivos } from "./useCases/useArquivosController/useControlerArquivos";
import {
  ConnectCliente,
  GetContador,
  createContador,
  getAllContador,
  getContadorId,
  getcontadoremail,
} from "./useCases/contadorController/contadorController";
import {
  createUser,
  getUserContadorId,
} from "./useCases/userUseController.ts/userController";
import { deleteCliente, getClienteValorMensal, getStatusAtualizado } from "./useCases/clienteUseController/clientsController";
import { getQtdboletoCliente } from "./useCases/boletoController/boletoController";
routerb.get("/suporte", getSuporte);
routerb.get("/cidadeb", getCityB);
routerb.post("/suporte", schemaValidation(suporteBody), createSuporte);
routerb.put("/upsuporte/:id", upSuporte);
routerb.put("/upsolucao/:id", upSolucaoSuporte);
routerb.put("/upatendente/:id", upAtendenteSuporte);
routerb.get("/clienteb/:cnpj", getClienteCnpjB);
routerb.get("/clienteidb/:cnpj", getClienteCnpjIdB);
routerb.get("/clientebasicb/:cnpj", getClienteCnpjBasicB);
routerb.post("/login/:login_id", createLogin);
routerb.post("/loginurl/:login_id", createLoginUrl);
routerb.get("/arquivoficais/:cnpj", BuscaArquivos);
routerb.get("/contador/all", getAllContador);
routerb.post("/user", createUser);
routerb.post("/contadorb", createContador);
routerb.get("/getcontador/:id", GetContador);
routerb.get("/getcontadorid/:id", getUserContadorId);
routerb.put("/conectcliente/:id/:contador_id", ConnectCliente);
routerb.put("/clientescontador/:id", clienteUpdateContador);
routerb.get("/getcontadoremail/:email", getcontadoremail);
routerb.get("/clientemensal", getClienteValorMensal)
routerb.get("/statuscliente", getStatusAtualizado)
routerb.get("/getlogincnpj/:cnpj", GetLoginCnpj)
routerb.get("/qtdboletocliente/:cnpj", getQtdboletoCliente )
routerb.get("/getcontadorcliente/:cnpj", getContadorCliente)
routerb.get("/getcontadoridid/:id", getContadorId )

export { routerb };
