import app from "./src/app";
import { envConfig } from "./src/config/config";
import connectDB from "./src/config/db";

const startServer = () => {
  const port = envConfig.port || 3000;

  connectDB()
    .then(() => {
      app.listen(port, () => {
        console.log(`Server is listening at http://localhost:${port}`);
      });
    })
    .catch((error) => {
      console.log(`Database Connection Failed: ${error}`);
      process.exit(1);
    });
};

startServer();
