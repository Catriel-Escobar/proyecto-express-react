import { Request, Response } from "express";
import { TeamMemberDAO } from "../dao/TeamMemberDAO";
import { IProject } from "../models/Projects";

export class TeamMemberController {
  static findMemberByEmail = async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const { success, message } = await TeamMemberDAO.findMemberByEmail(
        req.body
      );
      success ? res.send(message) : res.status(404).send({ error: message });
    } catch (error) {
      res.status(500).send({ error: "Hubo un error en el servidor." });
    }
  };

  static getProjectTeam = async (req: Request, res: Response) => {
    const projectId = req.params.projectId;
    try {
      const project = await TeamMemberDAO.getProjectTeam({ projectId });
      res.send(project);
    } catch (error) {
      res.status(500).send({ error: "Hubo un error en el servidor." });
    }
  };

  static addMemberById = async (req: Request, res: Response) => {
    const { id } = req.body;
    const project: IProject = req.project;
    try {
      const { success, message } = await TeamMemberDAO.AddMemberById({
        id,
        project,
      });

      success
        ? res.send({ message: message })
        : res.status(404).send({ error: message });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Hubo un error en el servidor." });
    }
  };

  static removeMemberById = async (req: Request, res: Response) => {
    const id = req.params.userId;
    const project: IProject = req.project;
    try {
      const { success, message } = await TeamMemberDAO.removeMemberById({
        id,
        project,
      });

      success
        ? res.send({ message: message })
        : res.status(404).send({ error: message });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Hubo un error en el servidor." });
    }
  };
}
