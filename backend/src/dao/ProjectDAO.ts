import Project from "../models/Projects";
import { crudRpta } from "../types/types.response";
import { cleanObject } from "../utils/transformObjects";

type estandarObject = { [key: string]: string };

export class ProjectDAO {
  static createProject = async (project: object): Promise<crudRpta> => {
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

  static getAllProjects = async (): Promise<crudRpta> => {
    const respuesta: crudRpta = {
      success: true,
      message: "",
    };
    try {
      respuesta.message = await Project.find({});
      return respuesta;
    } catch (error) {
      console.error("Error en la consulta de tareas:", error);
      throw new Error("Error en la consulta de tareas");
    }
  };

  static getProjectById = async (id: string): Promise<crudRpta> => {
    const respuesta: crudRpta = {
      success: true,
      message: "",
    };
    try {
      const project = await Project.findById(id).populate("tasks");
      if (!project) {
        respuesta.success = false;
        respuesta.message = "Proyecto no encontrado";
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
    id: string,
    object: estandarObject
  ): Promise<crudRpta> => {
    const respuesta: crudRpta = {
      success: true,
      message: "",
    };
    const newObj = cleanObject(object);
    try {
      const projectUpdate = await Project.findByIdAndUpdate(id, newObj);
      if (!projectUpdate) {
        respuesta.success = false;
        respuesta.message = "Proyecto no encontrado";
      } else {
        respuesta.message = "Proyecto actualizado";
      }
      return respuesta;
    } catch (error) {
      throw new Error("Error en la consulta de tareas");
    }
  };

  static deleteProject = async (id: string): Promise<crudRpta> => {
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
        await project.deleteOne();
        respuesta.message = "Proyecto Eliminado";
      }
      return respuesta;
    } catch (error) {
      throw new Error("Error en la consulta de Projectos");
    }
  };
}
