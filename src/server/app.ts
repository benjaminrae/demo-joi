import express from "express";
import morgan from "morgan";
import cors from "cors";
import basicAuth from "express-basic-auth";
import swaggerUi from "swagger-ui-express";
import generalError, { unknownEndpoint } from "./middlewares/errors.js";
import pingPongProtocolRouter from "./routers/pingPongProtocolRouter/pingPongProtocolRouter.js";
import openApiDocument from "../openapi/index.js";
import corsOptions from "./cors/corsOptions.js";
import { environment } from "../loadEnvironments.js";
import paths from "./routers/paths.js";
import usersRouter from "./routers/usersRouter/usersRouter.js";

const app = express();

app.use(cors(corsOptions));
app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.use(paths.root, pingPongProtocolRouter);

app.use(
  paths.apiDocs.base,
  basicAuth({
    users: {
      [environment.swaggerAuth.username]: environment.swaggerAuth.password,
    },
    challenge: true,
  }),
  swaggerUi.serve,
  swaggerUi.setup(openApiDocument)
);

app.use(paths.users.base, usersRouter);

app.use(unknownEndpoint);
app.use(generalError);

export default app;
