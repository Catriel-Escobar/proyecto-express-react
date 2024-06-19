import { IProject } from "../models/Projects";
import { ITask } from "../models/Task";
import { IToken } from "../models/Token";

export interface crudRpta {
  success: boolean;
  message: string | ITask | IProject | ITask[] | IToken;
  status?: number;
}
