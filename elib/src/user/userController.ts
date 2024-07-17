import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { envConfig } from "../config/config";

const handleUserRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get Data from Request Body
  const { name, password, email } = req.body;

  // Validation
  if (!name || !password || !email) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  // Process / Business Logic

  try {
    const isExistedUser = await userModel.findOne({ email });

    if (isExistedUser) {
      const error = createHttpError(400, "User already exists");
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = sign({ sub: newUser._id }, envConfig.jwt_secret as string, {
      expiresIn: "7d",
    });

    // Response
    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);

    const customError = createHttpError(
      500,
      "Server Error while registering!!"
    );
    return next(customError);
  }
};

const handleUserLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      const error = createHttpError(400, "User not found");
      return next(error);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      const error = createHttpError(400, "Invalid credentials");
      return next(error);
    }

    const token = sign({ sub: user._id }, envConfig.jwt_secret as string, {
      expiresIn: "7d",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);

    const customError = createHttpError(500, "Server Error while logging in!!");
    return next(customError);
  }
};

export { handleUserRegister, handleUserLogin };
