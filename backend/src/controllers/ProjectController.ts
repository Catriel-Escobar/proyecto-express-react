import { Request, Response } from "express";
import { crudRpta } from "../types/types.response";
import { ProjectDAO } from "../dao/ProjectDAO";

export class ProjectController {
  // TODO: CREATE
  static createProject = async (req: Request, res: Response) => {
    try {
      const { message }: crudRpta = await ProjectDAO.createProject(req.body);
      res.send({ message: message });
    } catch (error) {
      res.status(500).send({ error: "Error interno." });
    }
  };
  // *GEEET ALL
  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const { message }: crudRpta = await ProjectDAO.getAllProjects();
      res.send(message);
    } catch (error) {
      res.status(500).send({ error: "Error interno." });
    }
  };

  // *GEEET BY ID
  static getProjectById = async (req: Request, res: Response) => {
    try {
      const { success, message }: crudRpta = await ProjectDAO.getProjectById(
        req.params.id
      );
      success ? res.send(message) : res.status(400).send({ error: message });
    } catch (error) {
      res.status(500).send({ error: "Error interno." });
    }
  };

  //? UPDATE
  static updateProject = async (req: Request, res: Response) => {
    try {
      const { success, message }: crudRpta = await ProjectDAO.updateProject(
        req.params.id,
        req.body
      );
      success
        ? res.send({ message: message })
        : res.status(400).send({ error: message });
    } catch (error) {
      res.status(500).send({ error: "Error interno." });
    }
  };

  //!DELETE
  static deleteProject = async (req: Request, res: Response) => {
    try {
      const { success, message }: crudRpta = await ProjectDAO.deleteProject(
        req.params.id
      );
      success
        ? res.send({ message: message })
        : res.status(400).send({ error: message });
    } catch (error) {
      res.status(500).send({ error: "Error interno." });
    }
  };
}
