import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/config";
import createHttpError from "http-errors";

export interface AuthRequest extends Request {
  userId?: string;
}

const verifyJwtToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return next(createHttpError(401, "Authorization Token is required"));
    }

    const parsedToken = token.split(" ")[1];

    const decodedToken = jwt.verify(
      parsedToken,
      envConfig.jwt_secret as string
    );

    if (!decodedToken) {
      return next(createHttpError(401, "Token is Expired"));
    }

    const _customReq = req as AuthRequest;
    _customReq.userId = decodedToken.sub as string;

    next();
  } catch (error) {
    console.log("Token Verification Error: ", error);
    return next(createHttpError(401, "Invalid Token"));
  }
};

export default verifyJwtToken;
