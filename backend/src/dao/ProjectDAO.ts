import { Types } from "mongoose";
import Project, { IProject } from "../models/Projects";
import { crudRpta } from "../types/types.response";
import { cleanObject } from "../utils/transformObjects";
import Task, { ITask } from "../models/Task";

type estandarObject = { [key: string]: string };
type formProjectType = {
  projectName: string;
  clientName: string;
  description: string;
};
type FindByIdType = {
  projectId: string;
  userId: Types.ObjectId;
};
type CreateProjectType = {
  projectName: string;
  clientName: string;
  description: string;
  manager: string;
};
export class ProjectDAO {
  static createProject = async (
    project: CreateProjectType
  ): Promise<crudRpta> => {
    const newProject = new Project(project);
    const respuesta: crudRpta = {
      success: true,
      message: "",
    };
    try {
      await newProject.save();
      respuesta.message = "Proyecto creado correctamente";
      return respuesta;
    } catch (error) {
      console.error("Error en la consulta de tareas:", error);
      throw new Error("Error en la consulta de tareas");
    }
  };

  static getAllProjects = async (userId: Types.ObjectId): Promise<crudRpta> => {
    const respuesta: crudRpta = {
      success: true,
      message: "",
    };
    try {
      respuesta.message = await Project.find({
        $or: [{ manager: { $in: userId } }, { team: { $in: userId } }],
      });
      return respuesta;
    } catch (error) {
      console.error("Error en la consulta de tareas:", error);
      throw new Error("Error en la consulta de tareas");
    }
  };

  static getProjectById = async ({
    projectId,
    userId,
  }: FindByIdType): Promise<crudRpta> => {
    console.log(projectId, userId);
    const respuesta: crudRpta = { success: true, message: "" };
    try {
      const project = await Project.findById(projectId).populate({
        path: "tasks",
        populate: {
          path: "completedBy.user",
          select: "id name email",
        },
      });

      if (
        project!.manager?.toString() !== userId?.toString() &&
        !project!.team.includes(userId)
      ) {
        respuesta.success = false;
        respuesta.message = "No tenes acceso a este proyecto";
      } else {
        respuesta.message = project;
      }

      return respuesta;
    } catch (error) {
      console.error("Error en la consulta de tareas:", error);
      throw new Error("Error en la consulta de tareas");
    }
  };

  static updateProject = async (
    projectId: string,
    object: formProjectType
  ): Promise<crudRpta> => {
    const respuesta: crudRpta = { success: true };
    const newObj = cleanObject(object);
    try {
      await Project.findByIdAndUpdate(projectId, newObj);
      respuesta.message = "Proyecto actualizado!";
      return respuesta;
    } catch (error) {
      throw new Error("Error en la consulta de tareas");
    }
  };

  static deleteProject = async (project: IProject): Promise<crudRpta> => {
    const respuesta: crudRpta = { success: true };
    try {
      await project.deleteOne();
      respuesta.message = "Proyecto Eliminado";
      return respuesta;
    } catch (error) {
      throw new Error("Error en la consulta de Projectos");
    }
  };
}
