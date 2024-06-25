import Task, { ITask, TaskStatus } from "../models/Task";
import { cleanObject } from "../utils/transformObjects";
import { IProject } from "../models/Projects";
import { crudRpta } from "../types/types.response";
import { Types } from "mongoose";

type estandarObject = { [key: string]: string };
type objectIds = {
  taskId: string;
  projectId: string;
};

export class TaskDAO {
  static createTask = async (
    newTask: object,
    project: IProject
  ): Promise<crudRpta> => {
    const respuesta: crudRpta = {
      success: true,
      message: "Tarea creada correctamente",
    };
    try {
      const task = new Task(newTask);
      task.project = project.id;
      project.tasks.push(task.id);
      await Promise.allSettled([task.save(), project.save()]);
      return respuesta;
    } catch (error) {
      console.error("Error en la consulta de tareas:", error);
      throw new Error("Error en la consulta de tareas");
    }
  };

  static getTasks = async (projectId: string): Promise<crudRpta> => {
    const respuesta: crudRpta = {
      success: true,
      message: "",
    };
    try {
      const tasks = await Task.find({ project: projectId });

      if (!tasks || tasks.length === 0) {
        respuesta.success = false;
        respuesta.message = "No hay tareas registradas en este Proyecto";
      } else {
        respuesta.message = tasks;
      }

      return respuesta; // Devolver la respuesta al final de la función async
    } catch (error) {
      // Manejar el error adecuadamente, por ejemplo, registrar o lanzar una excepción
      console.error("Error en la consulta de tareas:", error);
      throw new Error("Error en la consulta de tareas");
    }
  };

  static getTaskById = async (ids: objectIds): Promise<crudRpta> => {
    const { taskId, projectId } = ids;
    const respuesta: crudRpta = {
      success: true,
      message: "",
    };
    try {
      const task = await Task.findOne({
        _id: taskId,
        project: projectId,
      })
        .populate({ path: "completedBy.user", select: "id name email" })
        .populate({
          path: "notes",
          populate: { path: "createdBy", select: "id name email" },
        });
      if (!task) {
        respuesta.success = false;
        respuesta.message = "No Existe una tarea con ese ID";
      } else {
        respuesta.message = task;
      }
      return respuesta;
    } catch (error) {
      console.error("Error en la consulta de tareas:", error);
      throw new Error("Error en la consulta de tareas");
    }
  };
  static updateTask = async (
    ids: objectIds,
    body: estandarObject
  ): Promise<crudRpta> => {
    const datosUpdate: estandarObject = cleanObject(body);
    const respuesta: crudRpta = {
      success: true,
      message: "",
    };
    try {
      const task = await Task.findOneAndUpdate(
        {
          _id: ids.taskId,
          project: ids.projectId,
        },
        datosUpdate,
        { new: true }
      );

      if (!task) {
        respuesta.success = false;
        respuesta.message = "Tarea no encontrada";
      } else {
        respuesta.message = "Tarea Actualizada";
      }
      return respuesta;
    } catch (error) {
      console.error("Error en la consulta de tareas:", error);
      throw new Error("Error en la consulta de tareas");
    }
  };

  static deleteTask = async (
    taskIn: ITask,
    project: IProject
  ): Promise<crudRpta> => {
    const respuesta: crudRpta = {
      success: true,
      message: "",
    };
    try {
      project.tasks = project.tasks.filter(
        (task) => task!.toJSON() !== taskIn.id.toString()
      );

      await Promise.allSettled([taskIn?.deleteOne(), project.save()]);
      respuesta.message = "Tarea Eliminada";

      return respuesta;
    } catch (error) {
      console.error("Error en la consulta de tareas:", error);
      throw new Error("Error en la consulta de tareas");
    }
  };

  static updateStatus = async (
    task: ITask,
    estado: { status: TaskStatus },
    userId: Types.ObjectId
  ): Promise<crudRpta> => {
    const respuesta: crudRpta = {
      success: true,
      message: "",
    };
    const { status } = estado;
    try {
      task.status = status;
      const data = {
        user: userId,
        status: status,
      };
      task.completedBy.push(data);
      await task.save();
      respuesta.message = "Status actualizado";

      return respuesta;
    } catch (error) {
      console.error("Error en la consulta de tareas:", error);
      throw new Error("Error en la consulta de tareas");
    }
  };
}
