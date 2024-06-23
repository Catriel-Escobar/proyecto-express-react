import { z } from "zod";

export const NoteSchema = z.object({
  content: z.string({ required_error: "El contenido es requerido" }),
});
