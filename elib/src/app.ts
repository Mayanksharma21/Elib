import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.json({
    message: "Welome to elib API's",
  });
});

// User Routes
app.use("/api/v1/users", userRouter);

// Book Router
app.use("/api/v1/books", bookRouter);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
