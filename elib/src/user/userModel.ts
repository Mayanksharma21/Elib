import mongoose from "mongoose";
import { UserInterface } from "./userTypes";

const userSchema = new mongoose.Schema<UserInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<UserInterface>("User", userSchema);
