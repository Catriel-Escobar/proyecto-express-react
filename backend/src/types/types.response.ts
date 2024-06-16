import { IProject } from "../models/Projects";
import { ITask } from "../models/Task";

export interface crudRpta {
  success: boolean;
  message: string | ITask | IProject | ITask[];
}
