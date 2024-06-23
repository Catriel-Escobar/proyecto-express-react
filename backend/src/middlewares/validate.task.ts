import { NextFunction, Request, Response } from "express";
import Task, { ITask } from "../models/Task";

declare global {
  namespace Express {
    interface Request {
      task: ITask;
    }
  }
}

export function hasAuthorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user!.id.toString() !== req.project.manager?.toString()) {
    return res.status(400).json({ error: "Accion no valida" });
  }
  next();
}

export async function validateTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { taskId, projectId } = req.params;
  try {
    const task = await Task.findOne({ _id: taskId, project: projectId });
    if (!task) {
      return res.status(404).json({ error: "No se encontro ninguna tarea" });
    }
    req.task = task;
    next();
  } catch (error) {
    console.log("error al buscar una tarea en by id", error);
    res.status(500).json({ error: "Hubo un error en le servidor" });
  }
}
