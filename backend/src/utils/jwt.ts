import jwt, {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";
import { envs } from "../config/env.config";
import { Types } from "mongoose";

type UserPayload = {
  id: Types.ObjectId;
};

export const generateJWT = (payload: UserPayload) => {
  const token = jwt.sign(payload, envs.JWT_SECRET, { expiresIn: "180d" });
  return token;
};

export const dataJwt = (token: string) => {
  try {
    const data = jwt.verify(token, envs.JWT_SECRET);
    return data;
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      throw new Error(error.message);
    } else if (error instanceof NotBeforeError) {
      throw new Error("El token no se encuentra activo.");
    } else if (error instanceof TokenExpiredError) {
      throw new Error("Token experiado");
    } else {
      throw new Error("Ocurrio un error al verificar token");
    }
  }
};
