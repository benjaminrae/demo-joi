import "../../loadEnvironments.js";
import debugConfig from "../../utils/debugConfig.js";
import chalk from "chalk";
import type { NextFunction, Request, Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import httpStatusCodes from "../../utils/httpStatusCodes.js";

const {
  serverErrors: { internalServerErrorCode },
  clientErrors: { notFoundCode },
} = httpStatusCodes;

const debug = debugConfig.extend("middlewares:errors");

const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  debug(chalk.bold.red(error.message));

  const statusCode = error.statusCode || internalServerErrorCode;
  const publicMessage =
    error.publicMessage || "There was an error on the server";

  res.status(statusCode).json({ error: publicMessage });
};

export const unknownEndpoint = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { path } = req;

  next(
    new CustomError(
      `Unknown endpoint: ${path}`,
      notFoundCode,
      "Unknown endpoint"
    )
  );
};

export default generalError;
