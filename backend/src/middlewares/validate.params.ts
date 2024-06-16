import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { ZodError, ZodSchema } from "zod";

export const validateSchemaParams =
  (schema: ZodSchema, nombreId: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parse(req.params[nombreId]);
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json(error.errors.map((error) => error.message));
      } else if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
    }
  };
