import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";

const app = express();

app.get("/", (req, res, next) => {
  res.json({
    message: "Welome to elib API's",
  });
});

// User Routes

app.use("/api/v1/users", userRouter);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
