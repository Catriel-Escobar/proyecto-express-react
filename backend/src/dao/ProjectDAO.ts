import { Types } from "mongoose";
import Project from "../models/Projects";
import { crudRpta } from "../types/types.response";
import { cleanObject } from "../utils/transformObjects";

type estandarObject = { [key: string]: string };
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

  static getAllProjects = async (id: string): Promise<crudRpta> => {
    const respuesta: crudRpta = {
      success: true,
      message: "",
    };
    try {
      respuesta.message = await Project.find({
        $or: [{ manager: { $in: id } }, { team: { $in: id } }],
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
      const project = await Project.findById(projectId).populate("tasks");
      if (!project) {
        respuesta.success = false;
        respuesta.message = "Proyecto no encontrado";
      } else {
        if (
          project.manager?.toString() !== userId?.toString() &&
          !project.team.includes(userId)
        ) {
          respuesta.success = false;
          respuesta.message = "No tenes acceso a este proyecto";
        } else {
          respuesta.message = project;
        }
      }
      return respuesta;
    } catch (error) {
      console.error("Error en la consulta de tareas:", error);
      throw new Error("Error en la consulta de tareas");
    }
  };

  static updateProject = async (
    id: string,
    managerId: string,
    object: estandarObject
  ): Promise<crudRpta> => {
    const respuesta: crudRpta = {
      success: true,
      message: "",
    };
    const newObj = cleanObject(object);
    try {
      const project = await Project.findByIdAndUpdate(id, newObj);
      if (!project) {
        respuesta.success = false;
        respuesta.message = "Proyecto no encontrado";
      } else {
        if (project.manager?.toString() !== managerId) {
          respuesta.success = false;
          respuesta.message = "Solo el manager puede actualizar el proyecto";
        } else {
          await project.save();
          respuesta.message = "Proyecto actualizado!";
        }
      }
      return respuesta;
    } catch (error) {
      throw new Error("Error en la consulta de tareas");
    }
  };

  static deleteProject = async (
    id: string,
    managerId: string
  ): Promise<crudRpta> => {
    const respuesta: crudRpta = {
      success: true,
      message: "",
    };
    try {
      const project = await Project.findById(id);
      if (!project) {
        respuesta.success = false;
        respuesta.message = "Proyecto no encontrado";
      } else {
        if (project.manager?.toString() !== managerId) {
          respuesta.success = false;
          respuesta.message = "Solo el manager puede eliminar el proyecto";
        } else {
          await project.deleteOne();
          respuesta.message = "Proyecto Eliminado";
        }
      }
      return respuesta;
    } catch (error) {
      throw new Error("Error en la consulta de Projectos");
    }
  };
}
