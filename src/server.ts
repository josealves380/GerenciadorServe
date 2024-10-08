import express from "express";
import cors from "cors";

import { router } from "./routes";

import { routerb } from "./routesb";

export const app = express();

app.use(express.json());

app.use(
  cors()
  //origin:Questao de acesso passa url
);
app.use(router);
app.use(routerb);
app.listen(3316, () => console.log("Running on port 3316"));
