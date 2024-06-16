import { z } from "zod";

export const createProjectSchema = z.object({
  projectName: z.string({
    required_error: "El nombre del proyecto es Obligatorio",
    invalid_type_error: "El titulo debe ser un texto",
  }),
  clientName: z.string({
    required_error: "El nombre del Cliente es Obligatorio",
    invalid_type_error: "El titulo debe ser un texto",
  }),
  description: z.string({
    required_error: "La descripcion es Obligatoria",
    invalid_type_error: "El titulo debe ser un texto",
  }),
});
