import dotenv from "dotenv";

dotenv.config();

const _config = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGODB_CONNECTION_STRING,
  node_env: process.env.NODE_ENV,
  jwt_secret: process.env.JWT_SECRET,
};

export const envConfig = Object.freeze(_config);
