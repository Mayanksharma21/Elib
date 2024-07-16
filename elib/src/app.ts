import express from "express";
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
