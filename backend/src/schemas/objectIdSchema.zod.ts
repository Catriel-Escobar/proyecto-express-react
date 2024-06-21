import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const ObjectIdSchema = z
  .string()
  .regex(objectIdRegex, "Invalid ObjectId");

export const ObjectIdSchemaObj = z.object({
  id: z
    .string({ required_error: "El id es requerido" })
    .regex(objectIdRegex, "El id ingresado no es valido"),
});

export type ObjectId = z.infer<typeof ObjectIdSchema>;
