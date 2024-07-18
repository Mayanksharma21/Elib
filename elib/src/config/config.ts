import dotenv from "dotenv";

dotenv.config();

const _config = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGODB_CONNECTION_STRING,
  node_env: process.env.NODE_ENV,
  jwt_secret: process.env.JWT_SECRET,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};

export const envConfig = Object.freeze(_config);
