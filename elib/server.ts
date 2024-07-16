import app from "./src/app";

const startServer = () => {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
};

startServer();
