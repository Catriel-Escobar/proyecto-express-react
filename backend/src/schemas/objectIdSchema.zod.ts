import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const ObjectIdSchema = z
  .string()
  .regex(objectIdRegex, "Invalid ObjectId");

export type ObjectId = z.infer<typeof ObjectIdSchema>;
