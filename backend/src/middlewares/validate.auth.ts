import { NextFunction, Request, Response } from "express";
import { dataJwt } from "../utils/jwt";
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";
import User, { IUser } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "no estas autorizado" });
  } else {
    try {
      const userId = dataJwt(token);

      if (!userId) {
        return res
          .status(404)

          .send({ error: "Hubo un error al autentificar el usuario." });
      }
      if (typeof userId === "object" && userId.id) {
        const user = await User.findById(userId.id).select({
          name: 1,
          _id: 1,
          email: 1,
        });

        if (!user) {
          return res.status(500).json({ error: "Token no valido" });
        }
        req.user = user;

        return next();
      }
    } catch (error) {
      if (
        error instanceof JsonWebTokenError ||
        error instanceof TokenExpiredError ||
        error instanceof NotBeforeError
      ) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error del servidor" });
      }
    }
  }
};
