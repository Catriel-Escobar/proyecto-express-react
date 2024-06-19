import { Request, Response } from "express";
import { AuthDAO } from "../dao/AuthDAO";

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    try {
      const { success, message } = await AuthDAO.createUser(req.body);
      success
        ? res.send({ message: message })
        : res.status(409).send({ error: message });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const { message, success } = await AuthDAO.confirmAccount(req.body.token);
      success
        ? res.send({ message })
        : res.status(404).send({ error: message });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static loginAccount = async (req: Request, res: Response) => {
    try {
      const { success, message, status } = await AuthDAO.loginAccount(req.body);
      success
        ? res.send({ message })
        : res.status(status!).send({ error: message });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static requestConfirmationCode = async (req: Request, res: Response) => {
    try {
      const { success, message, status } =
        await AuthDAO.requestConfirmationCode(req.body);
      success
        ? res.send({ message })
        : res.status(status!).send({ error: message });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
