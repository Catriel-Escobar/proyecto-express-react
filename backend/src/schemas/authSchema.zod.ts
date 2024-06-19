import { z } from "zod";

const CreateAuthSchema = z.object({
  email: z
    .string({
      required_error: "El e-mail es requerido",
    })
    .email({ message: "Email no valido" }),
  password: z
    .string({ required_error: "El password es obligatorio" })
    .min(5, { message: "El password debe tener al menos 5 caracteres" }),
  repassword: z
    .string({ message: "El password de confirmacion es obligatorio" })
    .min(5, {
      message:
        "La confirmación de la contraseña debe tener al menos 5 caracteres",
    }),
  name: z.string({
    required_error: "el nombre es Obligatorio",
    invalid_type_error: "El titulo debe ser un texto",
  }),
});
export const UserMail = CreateAuthSchema.pick({
  email: true,
});
export type UserType = z.infer<typeof CreateAuthSchema>;
export type UserEmailToToken = Pick<UserType, "email">;
// Esquema nuevo para solo email y password
export const LoginSchema = CreateAuthSchema.pick({
  email: true,
  password: true,
});

export type LoginType = z.infer<typeof LoginSchema>;

// le agrego el efecto luego de utilizar el pick. para poder utilizar el pick y refine a un schema.

export default CreateAuthSchema.refine(
  (data) => data.password === data.repassword,
  {
    message: "Las contraseñas no coinciden",
    path: ["repassword"],
  }
);

export const TokenConfirmCreateAuthSchema = z.object({
  token: z
    .string({
      required_error: "El token es requerido para confirmar el registro",
    })
    .length(6, {
      message: "El codigo de confirmacion admite solo 6 caracteres.",
    }),
});
