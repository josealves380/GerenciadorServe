import { Router } from "express";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import {
  ValorMensalput,
  clienteBLoqueado,
  clienteChave,
  clientePutGeraBoleto,
  clientePutId,
  clientePutIdBloqueado,
  clientePutIdGera,
  clienteUpdate,
  clienteUpdatePerc,
  clienteUpdateStatus,
  countCLiente,
  createCLiente,
  deleteCliente,
  filterCliente,
  getCity,
  getCliente,
  getClienteAtivado,
  getClienteCity,
  getClienteCnpj,
  getClienteCount,
  getClienteCountAll,
  getClienteCountDesativado,
  getClienteCountGeraBoleto,
  getClienteCountParceiro,
  getClienteCountParceiroBloqueado,
  getClienteCountParceiroDesbloqueado,
  getClienteCountParceiroDesativado,
  getClientePorPagina,
  getClienteUp,
  getCountCLienteParceiro,
  getDataAtivaDesativa,
  getGerarBoletos,
  getSeachCliente,
  getSeachClienteSemExpira,
  getSeachClienteSemExpirar,
  getStatusAtualizado,
  getUltimoCLiente,
  seachCliente,
  updateBasicCLiente,
  getClienteCountBloq,
  getClienteCountDesbloq,
  getClienteCountGeraBoletoFalse,
} from "./useCases/clienteUseController/clientsController";

import { schemaValidation } from "./useCases/clienteUseController/schemaValidation";
import {
  createUser,
  createUserParceiro,
  deleteUser,
  getCountParsa,
  getCountSuporte,
  getCountSuporteDesativo,
  getSeachUser,
  getSeachUserParceiro,
  getUSerDesativado,
  getUser,
  getUserCliente,
  getUserCount,
  getUserParceiroId,
  getUserParsa,
  getUserSuporte,
  getUserSuporteParceiro,
  updateSenha,
  userNivel,
  userNivelEmail,
  userNome,
  userPutId,
  userPutIdBloqueio,
} from "./useCases/userUseController.ts/userController";
import { userSchemaValidation } from "./useCases/userUseController.ts/userSchemaValidation";
import { userBody } from "./useCases/userUseController.ts/userSchema";
import {
  ClientePorParceiro,
  createParceiro,
  getAllParceiro,
  getClientePorParceiro,
  getClientePorParceiroPagar,
  getClientePorParceiroPago,
  getClienteValor,
  getParceiro,
  getParceiroAtivado,
  getParceiroDesativado,
  getParceiroId,
  getParceiroIdNumber,
  getParceiroUp,
  getSeachClienteParceiro,
  getSeachParceiro,
  parceiroPutId,
  parceiroPutIdBloqueado,
  parceiroUpdate,
  parceiroUpdateDados,
  parceiroValorCliente,
  parceirouserid,
  userParceiroFind,
} from "./useCases/parceiroUseController/parceiroController";
import { parceiroUpdateBody } from "./useCases/parceiroUseController/parceiroSchema";
import {
  createSuporte,
  getSuporte,
  upAtendenteSuporte,
  upSolucaoSuporte,
  upSuporte,
} from "./useCases/suportUseController/suporteController";
import {
  deleteRefreshToken,
  RefreshTokenUserController,
} from "./useCases/refreshTokenUser/RefreshTokenUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { suporteBody } from "./useCases/suportUseController/suporteSchemaVaidation";
import {
  createProduct,
  getProduto,
  getValorProduto,
} from "./useCases/productUse/productUseController";
import {
  Getquantidade,
  getClienteDataDesativado,
  getDataAtiva,
  getDataGroup,
  getDataGroupTwo,
  getDataGroupTwoParsa,
  getProdutoCliente,
  sumProdutoCliente,
} from "./useCases/quantidadeControler/quantidadeControler";
import { createChave } from "./useCases/chaveController/useChaveController";
import { createQativacao } from "./useCases/ativacaoController/ativacaoControllerData";
import {
  CountBoletos,
  createBoleto,
  createBoletoParceiro,
  deleteBoleto,
  getBoleto,
  getBoletoOne,
  getBoletos,
  getBoletosEnviados,
  getBoletosVencidos,
  getQtdboleto,
  updateBoleto,
  updateBoletoDados,
  updateStatusBoleto,
} from "./useCases/boletoController/boletoController";
import {
  createFinanceiro,
  getMensalidade,
} from "./useCases/financeiroController/financeiroController";
import {
  ConfigF2bput,
  createConfigF2b,
  getConfigF2b,
  getConfigSalario,
} from "./useCases/useConfigF2b/useConfigF2bController";
import {
  createContador,
  getAllContador,
  getSeachContador,
} from "./useCases/contadorController/contadorController";
import { GetLogin } from "./useCases/loginController/loginController";

const router = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();
//rotas usuário

router.post(
  "/usersearchparceiro/:parceiro_id",
  ensureAuthenticated,
  getSeachUserParceiro
);
router.post(
  "/user/parceiro",
  userSchemaValidation(userBody),
  createUserParceiro
);
router.post("/user", userSchemaValidation(userBody), createUser);
router.post("/usersearch", ensureAuthenticated, getSeachUser);

router.get("/user/countDesativado", ensureAuthenticated, getUSerDesativado);
router.get("/usersuporte/count", ensureAuthenticated, getCountSuporte);
router.get(
  "/usersuportedesativo/count",
  ensureAuthenticated,
  getCountSuporteDesativo
);
router.get("/usersuporteparceiro/suporte/:id", getUserSuporteParceiro);
router.get("/userparsa/count", ensureAuthenticated, getCountParsa);
router.get("/user/count", ensureAuthenticated, getUserCount);
router.get("/user/cliente/:parceiro_id", getUserCliente);
router.get("/userparceiro/:id", getUserParceiroId);
router.get("/user/:email/email", userNivelEmail);
router.get("/usersuporte", getUserSuporte);
router.get("/userparsa", getUserParsa);
router.get("/user/name/:id", userNome);
router.get("/user/:id", userNivel);
router.get("/user", getUser);

router.put("/userBloqueio/:id", ensureAuthenticated, userPutIdBloqueio);
router.put("/user/:id", ensureAuthenticated, userPutId);

router.delete("/user/:id", deleteUser);
//Rotas do parceiro
//router.post("/parceiro/update",  ensureAuthenticated,  schemaValidation(parceiroUpdateBody),  parceiroUpdate);
router.post(
  "/parceiropago/:id/cliente",
  ensureAuthenticated,
  getClientePorParceiroPago
);
router.post("/parceiroup/:id", ensureAuthenticated, parceiroUpdateDados);
router.post("/parceirosearch", ensureAuthenticated, getSeachParceiro);
router.post("/parceiro", ensureAuthenticated, createParceiro);

router.get(
  "/parceiroboleto/:id/cliente/:parceiro_id/dia/:dia",
  ensureAuthenticated,
  ClientePorParceiro
);
router.get(
  "/parceiropagar/:id/cliente/:parceiro_id",
  ensureAuthenticated,
  getClientePorParceiroPagar
);
router.get(
  "/parceiro/:id/cliente/:parceiro_id",
  ensureAuthenticated,
  getClientePorParceiro
);
router.post(
  "/parceiro/:id/cliente",
  ensureAuthenticated,
  getSeachClienteParceiro
);
router.get(
  "/parceiro/parceiroDesativado",
  ensureAuthenticated,
  getParceiroDesativado
);
router.get(
  "/parceiro/parceiroAtivado",
  ensureAuthenticated,
  getParceiroAtivado
);
router.get("/parceiroId/:id", ensureAuthenticated, getParceiroUp);
//router.get("/parceiroIdNumber/:id", getParceiroIdNumber);
router.get("/parceiro/:id/cliente", getParceiroId);
router.get("/parceiro/all", getAllParceiro);
router.get("/parceiro", getParceiro);
router.get("/parceirofind", userParceiroFind)
router.get("/userparceiroid/:parceiro_id", parceirouserid)
router.put(
  "/parceiroBloqueio/:id",
  ensureAuthenticated,
  parceiroPutIdBloqueado
);
router.put("/parceiro/:id", ensureAuthenticated, parceiroPutId);

//Rotas do cliente
router.post("/clientestatus", ensureAuthenticated, getSeachClienteSemExpira);
router.post("/clientecnpj", ensureAuthenticated, getSeachClienteSemExpirar);
router.post("/clientesearch", ensureAuthenticated, getSeachCliente);
router.post("/clientecity", ensureAuthenticated, getClienteCity);
router.post("/cliente", ensureAuthenticated, createCLiente);
router.post("/cliente/update/:id", clienteUpdate);
router.post("/cliente/updateperc/:id", clienteUpdatePerc);
router.post("/clienteporpagina", ensureAuthenticated, getClientePorPagina);
router.get(
  "/countclientebloqueado/:parceiro_id",
  getClienteCountParceiroBloqueado
);
router.get(
  "/countclientedesbloqueado/:parceiro_id",
  getClienteCountParceiroDesbloqueado
);
router.get(
  "/clienteparceiro/count/:id",
  ensureAuthenticated,
  getCountCLienteParceiro
);
router.get(
  "/cliente/countDesativado",
  ensureAuthenticated,
  getClienteCountDesativado
);
router.get("/clientecountbloq", ensureAuthenticated, getClienteCountBloq);
router.get(
  "/clientecountdesbloq",

  getClienteCountDesbloq
);
router.get(
  "/clientedata/:cliente_id",
  ensureAuthenticated,
  getDataAtivaDesativa
);
router.get("/cliente/search/bloqueado", ensureAuthenticated, clienteBLoqueado);
router.get("/cliente/count", ensureAuthenticated, getClienteCount);
router.get("/clientecount", countCLiente);
router.get("/clientecountparceiro/:parceiro_id", getClienteCountParceiro);
router.get(
  "/clientecountparceirodesativado/:parceiro_id",
  getClienteCountParceiroDesativado
);

router.get("/cliente/filter", ensureAuthenticated, filterCliente);
router.get("/cliente/search", ensureAuthenticated, seachCliente);
router.get("/clienteId/:id", ensureAuthenticated, getClienteUp);
router.get("/cliente", ensureAuthenticated, getCliente);
router.get("/clienteAtivo/:id", getClienteAtivado);
router.get("/valor/:id", getClienteValor);
router.get("/clientecountall", getClienteCountAll);
router.put("/clientegeraBoleto/:id", ensureAuthenticated, clientePutGeraBoleto);
router.put("/clienteBloqueado/:id", ensureAuthenticated, clientePutIdBloqueado);
router.put("/clientegeraOnline/:id", ensureAuthenticated, clientePutIdGera);
router.put("/cliente/:id", ensureAuthenticated, clientePutId);
router.put("/clientestatus/:id", clienteUpdateStatus);
router.put("/valorcliente/:id", parceiroValorCliente);
router.put("/cliente/chave/:id", clienteChave);
router.put("/clientebasic/:id", updateBasicCLiente);
router.put("/editavalormensal/:id", ValorMensalput);
router.delete("/cliente/:id", deleteCliente);

//Rotas de login
router.post("/refresh-token", refreshTokenUserController.handle);
router.post("/login", authenticateUserController.handle);
router.get("/refresh-token", authenticateUserController.handle);
router.delete("/refresh/:id", deleteRefreshToken);

//Rotas de suporte
router.post("/suporte", schemaValidation(suporteBody), createSuporte);
router.get("/suporte", getSuporte);

//Demais rotas
router.post(
  "/financeiro/:cliente_id/mensalidade/:mensalidade_id/",
  createFinanceiro
);
router.post("/boletoParceiro/:parceiro_id/:boleto_id", createBoletoParceiro);
router.post("/boleto/:cliente_id/:boleto_id/:parceiro_id", createBoleto);
router.post("/qativacao/:cliente_id/:ativacao_id", createQativacao);
router.post("/quantidade/:cliente_id/:produto_id", Getquantidade);
router.get("/getclientegeraboletofalse", getClienteCountGeraBoletoFalse);
router.get("/getclientegeraboleto", getClienteCountGeraBoleto);
router.get("/produtocliente/:cliente_id", getProdutoCliente);
router.put("/upsuporte/:id", ensureAuthenticated, upSuporte);
router.get("/sumProduto/:cliente_id", sumProdutoCliente);
router.get("/qativacao/data", getClienteDataDesativado);
router.get("/boletoone/:parceiro_id/:id", getBoletoOne);
router.put("/upstatusboleto/:id", updateStatusBoleto);
router.get("/financeiromensalidade", getMensalidade);
router.post("/qativacao/grouptwo", getDataGroupTwo);
router.post("/qativacao/two/:parceiro_id", getDataGroupTwoParsa);
router.get("/boletosEnviados", getBoletosEnviados);
router.get("/boletosvencidos", getBoletosVencidos);
router.delete("/boletodelete/:id", deleteBoleto);
router.get("/valorproduto/:id", getValorProduto);
router.get("/getgeraboletos", getGerarBoletos);
router.get("/boletos/:parceiro_id", getBoleto);
router.post("/chave/:cliente_id", createChave);
router.post("/qativacao/group", getDataGroup);
router.get("/getf2b/:user_id", getConfigF2b);
router.put("/upboleto/:id", updateBoleto);
router.put("/upboletodados/:id", updateBoletoDados);
router.post("/produto", createProduct);
router.get("/getproduto", getProduto);
router.get("/ultimo", getUltimoCLiente);
router.get("/qativacao", getDataAtiva);
router.get("/allboletos", getBoletos);
router.post("/f2b", createConfigF2b);
router.get("/cidade", getCity);
router.put("/upsolucao/:id", upSolucaoSuporte);
router.put("/upatendente/:id", upAtendenteSuporte);
router.get("/getlogin", GetLogin);
//rotas contador
router.post("/contadorsearch", ensureAuthenticated, getSeachContador);
router.post("/contador", ensureAuthenticated, createContador);
router.get("/configsalario", getConfigSalario);
router.put("/configput/:id", ConfigF2bput);

router.get("/qtdboleto", CountBoletos);
router.post("/getboletosmes", getQtdboleto);

router.put("/updatesenha", updateSenha); 
export { router };
