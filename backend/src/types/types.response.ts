import { IProject } from "../models/Projects";
import { ITask } from "../models/Task";
import { IToken } from "../models/Token";
import { IUser } from "../models/User";

export interface crudRpta {
  success: boolean;
  message?: string | ITask | IProject | ITask[] | IToken | UserResumido;
  status?: number;
  token?: string;
}

type UserResumido = Pick<IUser, "name" | "email" | "id">;
