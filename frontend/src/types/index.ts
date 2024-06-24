import { z } from "zod";

//!AUTH & USERS

export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  current_password: z.string(),
  password: z.string(),
  repassword: z.string(),
  token: z.string(),
});

//! AUTH SCHEMA

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  _id: z.string(),
});

export type User = z.infer<typeof userSchema>;

export type UserProfileForm = Pick<User, "name" | "email">;

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
export type UpdateCurrentPasswordUser = Pick<
  Auth,
  "current_password" | "password" | "repassword"
>;
// tasks

export const taskStatusSchema = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed",
]);

/** */
export const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema,
  task: z.string(),
  createdAt: z.string(),
});

export type Note = z.infer<typeof noteSchema>;

export type NoteFormData = Pick<Note, "content">;

//! task schema
export const taskSchema = z.object({
  // schema tipo objeto. ZOD
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  completedBy: z.array(
    z.object({
      _id: z.string(),
      user: userSchema.or(z.null()),
      status: taskStatusSchema,
    })
  ), // PARA RECIBIR
  notes: z.array(noteSchema.or(z.string()).or(z.null())),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
export type TaskStatus = z.infer<typeof taskStatusSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;

//! Projects schema

export const projectSchema = z.object({
  // schema tipo objeto. ZOD
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  manager: z.string(userSchema.pick({ _id: true })),
  tasks: z.array(taskSchema),
  team: z.array(z.string()),
});

export const dashboardProjectSchema = z.array(
  // con el schema anterior le digo a zod que me cree un esquema de tipo array que dentro contendra objetos de tipo projectSchema.
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true,
  })
);

export type Project = z.infer<typeof projectSchema>; // Creo un Type de ts con los atributos del schema de zod.

// aca creo un type de ts con lo mismo del anterior eligiendo los atributos que quiero tener.
// y los atributos q dejo afuera no los nombro
export type ProjectFormData = Pick<
  Project,
  "clientName" | "projectName" | "description"
>;

// TEAM SCHEMA

export const TeamMemberSchema = userSchema.pick({
  email: true,
  name: true,
  _id: true,
});

export const TeamMemberArraySchema = z.array(TeamMemberSchema);

export type TeamMember = z.infer<typeof TeamMemberSchema>;

export type TeamMemberForm = Pick<TeamMember, "email">;

export const ProjectByIdSchema = projectSchema
  .pick({
    _id: true,
    clientName: true,
    description: true,
    manager: true,
    projectName: true,
    team: true,
  })
  .extend({
    tasks: z.array(taskSchema),
  });
