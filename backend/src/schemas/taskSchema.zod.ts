import { z } from "zod";

export const createTaskSchema = z.object({
  name: z.string({
    required_error: "El nombre de la tarea es Obligatorio",
    invalid_type_error: "El nombre debe ser un texto",
  }),
  description: z.string({
    required_error: "La descripcion es Obligatoria",
    invalid_type_error: "La descripcion debe ser un texto",
  }),
});
