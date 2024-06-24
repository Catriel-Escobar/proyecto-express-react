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
export const TokenConfirmCreateAuthSchema = z.object({
  token: z
    .string({
      required_error: "El token es requerido para confirmar el registro",
    })
    .length(6, {
      message: "El token invalido",
    }),
});

export const TokenParamConfirm = z.string({
  required_error: "El token es requerido para confirmar el registro",
});

//? picks
export const NewPasswordSchema = CreateAuthSchema.pick({
  password: true,
  repassword: true,
}).refine((data) => data.password === data.repassword, {
  message: "Las contraseñas no coinciden",
  path: ["repassword"],
});
export const UserMail = CreateAuthSchema.pick({
  email: true,
});
export type UserEmailToToken = Pick<UserType, "email">;

export const LoginSchema = CreateAuthSchema.pick({
  email: true,
  password: true,
});

export const ProfileUpdate = CreateAuthSchema.pick({
  name: true,
  email: true,
});

export type UserType = z.infer<typeof CreateAuthSchema>;
export type LoginType = z.infer<typeof LoginSchema>;

// le agrego el efecto luego de utilizar el pick. para poder utilizar el pick y refine a un schema.

// AGREGADA UNA OPCION
export default CreateAuthSchema.refine(
  (data) => data.password === data.repassword,
  {
    message: "Las contraseñas no coinciden",
    path: ["repassword"],
  }
);

export const UpdateCurrentUserPassword = z
  .object({
    current_password: z.string({ message: "El password es requerido" }),
    password: z
      .string({ message: "El password nuevo es requerido" })
      .min(8, { message: "El minimo de caracteres es 8" }),
    repassword: z.string({
      message: "El password de confirmacion es requerido",
    }),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Los password no coinciden",
    path: ["repassword"],
  });
