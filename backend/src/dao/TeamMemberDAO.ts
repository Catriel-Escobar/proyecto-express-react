import Project, { IProject } from "../models/Projects";
import User from "../models/User";
import { crudRpta } from "../types/types.response";

export class TeamMemberDAO {
  static findMemberByEmail = async ({
    email,
  }: {
    email: string;
  }): Promise<crudRpta> => {
    const respuesta: crudRpta = { success: true };
    try {
      const user = await User.findOne({ email: email }).select("id email name");
      if (!user) {
        respuesta.success = false;
        respuesta.message = "No se encontro un usuario";
      } else {
        respuesta.message = user;
      }
      return respuesta;
    } catch (error) {
      console.log("Desde team find user by email", error);
      throw new Error("ERROR AL BUSCAR UN USUARIO POR EMAIL");
    }
  };

  static getProjectTeam = async ({ projectId }: { projectId: string }) => {
    try {
      const project = await Project.findById(projectId).populate({
        path: "team",
        select: "id email name",
      });
      return project?.team;
    } catch (error) {
      console.log("get project", error);
      throw new Error("error al buscar el team del project");
    }
  };

  static AddMemberById = async ({
    id,
    project,
  }: {
    id: string;
    project: IProject;
  }): Promise<crudRpta> => {
    const respuesta: crudRpta = { success: true };
    try {
      const user = await User.findById(id);

      if (!user) {
        respuesta.success = false;
        respuesta.message = "No se encontro un usuario";
      } else {
        if (
          project.team.some((team) => team!.toString() === user.id.toString())
        ) {
          respuesta.success = false;
          respuesta.message = "El usuario ya se encuentra en el team";
        } else {
          project.team.push(user.id);
          await project.save();
          respuesta.message = "Agregado al team con exito";
        }
      }
      return respuesta;
    } catch (error) {
      console.log("Desde team find user by email", error);
      throw new Error("ERROR AL BUSCAR UN USUARIO POR EMAIL");
    }
  };

  static removeMemberById = async ({
    id,
    project,
  }: {
    id: string;
    project: IProject;
  }): Promise<crudRpta> => {
    const respuesta: crudRpta = { success: true };
    try {
      if (!project.team.some((team) => team?.toString() === id.toString())) {
        respuesta.success = false;
        respuesta.message = "El usuario no pertenece al team";
      } else {
        console.log(id);
        project.team = project.team.filter(
          (teamMember) => teamMember?.toString() !== id
        );
        await project.save();
        respuesta.message = "Elimidado del team con exito";
      }
      return respuesta;
    } catch (error) {
      console.log("Desde team find user by email", error);
      throw new Error("ERROR AL ELIMINAR UN USUARIO POR EMAIL");
    }
  };
}
