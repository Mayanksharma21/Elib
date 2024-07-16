import express, { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { envConfig } from "./config/config";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app = express();

app.get("/", (req, res, next) => {
  res.json({
    message: "Welome to elib API's",
  });
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
