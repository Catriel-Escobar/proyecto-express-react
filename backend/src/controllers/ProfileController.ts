import { Request, Response } from "express";
import { ProfileDAO } from "../dao/ProfileDAO";

export class ProfileController {
  static updateProfile = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const user = req.user!;
    try {
      const { success, message, status } = await ProfileDAO.updateProfile(
        name,
        email,
        user
      );
      success
        ? res.send({ message })
        : res
            .status(status!)
            .send({ error: "Ocurrio un error al actualizar el usuario" });
    } catch (error) {
      res.status(500).send({ error: "Hubo un error" });
    }
  };

  static updateCurrentUserPassword = async (req: Request, res: Response) => {
    const { current_password, password } = req.body;

    try {
      const { success, message, status } =
        await ProfileDAO.updateCurrentUserPassword(
          current_password,
          password,
          req.user!
        );
      success
        ? res.send({ message })
        : res.status(status!).send({ error: message });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Hubo un error" });
    }
  };
}
