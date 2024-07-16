import app from "./src/app";
import { envConfig } from "./src/config/config";

const startServer = () => {
  const port = envConfig.port || 3000;

  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
};

startServer();
