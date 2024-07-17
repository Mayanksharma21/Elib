import express from "express";
import { handleUserRegister } from "./userController";

const userRouter = express.Router();

userRouter.route("/register").post(handleUserRegister);

export default userRouter;
