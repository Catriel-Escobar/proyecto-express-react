import { z } from "zod";

// AUTH & USERS

export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  repassword: z.string(),
  token: z.string(),
});

export type Auth = z.infer<typeof authSchema>;
export type ConfirmToken = Pick<Auth, "token">;
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<
  Auth,
  "email" | "password" | "name" | "repassword"
>;
export type RequestConfirmationCodeForm = Pick<Auth, "email">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth, "password" | "repassword">;
// tasks

export const taskStatusSchema = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed",
]);

export const taskSchema = z.object({
  // schema tipo objeto. ZOD
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
export type TaskStatus = z.infer<typeof taskStatusSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;

// Projects

export const projectSchema = z.object({
  // schema tipo objeto. ZOD
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
});

export const dashboardProjectSchema = z.array(
  // con el schema anterior le digo a zod que me cree un esquema de tipo array que dentro contendra objetos de tipo projectSchema.
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
  })
);

export type Project = z.infer<typeof projectSchema>; // Creo un Type de ts con los atributos del schema de zod.

// aca creo un type de ts con lo mismo del anterior eligiendo los atributos que quiero tener.
// y los atributos q dejo afuera no los nombro
export type ProjectFormData = Pick<
  Project,
  "clientName" | "projectName" | "description"
>;
