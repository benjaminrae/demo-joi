import express from "express";
import morgan from "morgan";
import cors from "cors";
import generalError, { unknownEndpoint } from "./middlewares/errors.js";
import paths from "./routes/paths.js";
import pingPongProtocolRouter from "./routes/pingPongProtocolRouter/pingPongProtocolRouter.js";

const { baseUrl } = paths;

const app = express();

app.use(cors());
app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.use(baseUrl, pingPongProtocolRouter);

app.use(unknownEndpoint);
app.use(generalError);

export default app;
