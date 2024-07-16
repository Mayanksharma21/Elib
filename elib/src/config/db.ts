import mongoose from "mongoose";
import { envConfig } from "./config";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database Connected !!");
    });

    mongoose.connection.on("error", (error) => {
      console.log(`Database Connection Failed: ${error}`);
      process.exit(1);
    });

    // These listeners must be register in node environment before trying to connect with DB
    // That's why these listeners takes place prior to connection work

    await mongoose.connect(envConfig.mongo_uri as string);
  } catch (error) {
    console.log(`MongoDB Connection Failed: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
