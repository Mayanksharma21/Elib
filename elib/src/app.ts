import express from "express";

const app = express();

app.get("/", (req, res, next) => {
  res.json({
    message: "Welome to elib API's",
  });
});

export default app;
