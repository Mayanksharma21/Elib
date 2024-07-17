import express from "express";
import { handleUserLogin, handleUserRegister } from "./userController";

const userRouter = express.Router();

userRouter.route("/register").post(handleUserRegister);
userRouter.route("/login").post(handleUserLogin);

export default userRouter;
