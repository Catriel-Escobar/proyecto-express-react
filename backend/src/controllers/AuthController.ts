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
      const { success, message, status, token } = await AuthDAO.loginAccount(
        req.body
      );

      if (success) {
        res.cookie("token", token, { httpOnly: true });
        return res.send({ message });
      } else {
        res.status(status!).send({ error: message });
      }
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

  static forgotPassword = async (req: Request, res: Response) => {
    try {
      const { success, message, status } = await AuthDAO.forgotPassword(
        req.body
      );
      success
        ? res.send({ message })
        : res.status(status!).send({ error: message });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static validateToken = async (req: Request, res: Response) => {
    try {
      const { message, success } = await AuthDAO.validateToken(req.body.token);
      success
        ? res.send({ message })
        : res.status(404).send({ error: message });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updatePasswordWithToken = async (req: Request, res: Response) => {
    const password = req.body.password;
    const token = req.params.token;
    try {
      const { message, success } = await AuthDAO.updatePasswordWithToken({
        password,
        token,
      });
      success
        ? res.send({ message })
        : res.status(404).send({ error: message });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static logout = async (req: Request, res: Response) => {
    try {
      res.clearCookie("token");
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static user = async (req: Request, res: Response) => {
    res.json(req.user!);
  };
}
