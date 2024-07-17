import { NextFunction, Request, Response } from "express";

const handleUserRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    message: "User registered successfully",
  });
};

export { handleUserRegister };
