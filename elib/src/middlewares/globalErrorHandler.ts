import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { envConfig } from "../config/config";

const globalErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    message: err.message || "Something Went Wrong",
    errorStack: envConfig.node_env === "development" ? err.stack : "",
  });
};

export default globalErrorHandler;
