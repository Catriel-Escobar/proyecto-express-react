import { envs } from "../config/env.config";
import { transport } from "../config/nodemailer";

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static sendConfirmationEmail = async (parametros: IEmail) => {
    try {
      const info = await transport.sendMail({
        from: "Uptask <admin@uptask.com>",
        to: parametros.email,
        subject: "Confirma tu cuenta",
        text: "UpTask confirma tu cuenta boludo",
        html: `<p>Hola: ${parametros.name} has creado tu cuenta en upTask, ya casi esta todo listo, solo debes confirmar Tu cuenta</p>
        <p>Visita el siguiente enlace</p>
        <a href="${envs.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
        <p>Ingresa el siguiente codigo: <b>${parametros.token}</b></p>
        <p>Este token expira en 10 minutos</p>
        `,
      });
      console.log("mensaje enviado: ", info.messageId);
    } catch (error) {
      throw new Error("Ocurrio un error al enviar el mail de confirmacion");
    }
  };

  static sendPasswordResetToken = async (parametros: IEmail) => {
    try {
      const info = await transport.sendMail({
        from: "Uptask <admin@uptask.com>",
        to: parametros.email,
        subject: "Restablece tu password",
        text: "UpTask - Restablece tu password boludo",
        html: `<p>Hola: ${parametros.name} has solicitado restablecer tu password.</p>
        <p>Visita el siguiente enlace</p>
        <a href="${envs.FRONTEND_URL}/auth/new-password">Restablecer el password</a>
        <p>Ingresa el siguiente codigo: <b>${parametros.token}</b></p>
        <p>Este token expira en 10 minutos</p>
        `,
      });
      console.log("mensaje enviado: ", info.messageId);
    } catch (error) {
      throw new Error("Ocurrio un error al enviar el mail de confirmacion");
    }
  };
}
