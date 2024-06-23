import { Request, Response } from "express";
import { TaskDAO } from "../dao/TaskDAO";
import { crudRpta } from "../types/types.response";

export type ObjectEdit = {
  name: string;
  description: string;
};

export type StringObject = {
  [key: string]: string;
};

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const { message }: crudRpta = await TaskDAO.createTask(
        req.body,
        req.project
      );
      res.send({
        message,
      });
    } catch (error) {
      res.status(500).send({ error: "Error interno." });
    }
  };

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const { success, message }: crudRpta = await TaskDAO.getTasks(
        req.params.projectId
      );
      success ? res.send(message) : res.status(400).send({ error: message });
    } catch (error) {
      res.status(500).send({ error: "Error interno." });
    }
  };

  static getTaskById = async (req: Request, res: Response) => {
    const { taskId, projectId } = req.params;
    try {
      const { success, message }: crudRpta = await TaskDAO.getTaskById({
        taskId,
        projectId,
      });
      success ? res.send(message) : res.status(400).send({ error: message });
    } catch (error) {
      res.status(500).send({ error: "Error interno." });
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    const { taskId, projectId } = req.params;
    try {
      const { success, message }: crudRpta = await TaskDAO.updateTask(
        { taskId, projectId },
        req.body
      );
      success
        ? res.send({ message: message })
        : res.status(400).send({ error: message });
    } catch (error) {
      res.status(500).send({ error: "Error interno." });
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    const { taskId, projectId } = req.params;
    try {
      const { success, message }: crudRpta = await TaskDAO.deleteTask(
        { taskId, projectId },
        req.project
      );

      success
        ? res.send({ message: message })
        : res.status(400).send({ error: message });
    } catch (error) {
      res.status(500).send({ error: "Error interno." });
    }
  };

  static updateStatus = async (req: Request, res: Response) => {
    const { taskId, projectId } = req.params;
    try {
      const { success, message }: crudRpta = await TaskDAO.updateStatus(
        req.task,
        req.body,
        req.user!.id
      );
      success
        ? res.send({ message: message })
        : res.status(400).send({ error: message });
    } catch (error) {
      res.status(500).send({ error: "Error interno." });
    }
  };
}
