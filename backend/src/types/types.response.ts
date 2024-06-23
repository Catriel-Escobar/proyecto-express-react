import { INote } from "../models/Note";
import { IProject } from "../models/Projects";
import { ITask } from "../models/Task";
import { IToken } from "../models/Token";
import { IUser } from "../models/User";

export interface crudRpta {
  success: boolean;
  message?: any;
  status?: number;
  token?: string;
}

type UserResumido = Pick<IUser, "name" | "email" | "id">;
