import { comparePassword, hashPassword } from "../utils/hashing";
import User, { IUser } from "../models/User";
import { LoginType, UserType } from "../schemas/authSchema.zod";
import { crudRpta } from "../types/types.response";
import Token from "../models/Token";
import { generateToken } from "../utils/tokenConfirmacion";
import { AuthEmail } from "../emails/AuthEmail";

export class AuthDAO {
  static createUser = async (user: UserType): Promise<crudRpta> => {
    const respuesta: crudRpta = {
      success: true,
      message: "",
    };
    try {
      const exist = await User.findOne({ email: user.email });
      if (exist) {
        respuesta.success = false;
        respuesta.message = "El usuario ya esta registrado";
      } else {
        user.password = await hashPassword(user.password);
        const newUser: IUser = new User(user);
        const token = new Token();
        token.token = generateToken();
        token.user = newUser.id;
        // enviar email con codigo
        AuthEmail.sendConfirmationEmail({
          email: newUser.email,
          name: newUser.name,
          token: token.token,
        });
        await Promise.allSettled([newUser.save(), token.save()]);
        respuesta.message = "Cuenta creada, revisa tu email para confirmarla.";
      }
      return respuesta;
    } catch (error) {
      console.log(error);
      throw new Error("Ocurrio un error al crear el usuario.");
    }
  };

  static confirmAccount = async (token: string): Promise<crudRpta> => {
    const respuesta: crudRpta = {
      success: true,
      message: "",
    };
    try {
      const exist = await Token.findOne({ token });
      if (!exist) {
        (respuesta.success = false),
          (respuesta.message = "El token no existe por favor genera otro.");
      } else {
        const user = await User.findById(exist.user);
        user!.confirmed = true;
        await Promise.allSettled([user?.save(), exist.deleteOne()]);
        respuesta.message = "Cuenta confirmada!.";
      }
      return respuesta;
    } catch (error) {
      throw new Error("Error al buscar el token");
    }
  };

  static loginAccount = async (user: LoginType): Promise<crudRpta> => {
    const { email, password } = user;
    const respuesta: crudRpta = {
      success: false,
      message: "",
      status: 404,
    };
    try {
      const user = await User.findOne({ email });
      if (!user) {
        respuesta.message = "No existe un usuario con los datos ingresados.";
      } else if (!user.confirmed) {
        const token = new Token();
        token.token = generateToken();
        token.user = user.id;
        // enviar email con codigo
        AuthEmail.sendConfirmationEmail({
          email: user.email,
          name: user.name,
          token: token.token,
        });
        await token.save();
        respuesta.status = 401;
        respuesta.message =
          "Tu cuenta no esta confirmada. se envio un codigo de confirmacion a tu mail.";
      } else {
        const passwordValida = await comparePassword(password, user.password);
        console.log(passwordValida);
        if (!passwordValida) {
          respuesta.message = "Los datos ingresados son incorrectos.";
        } else {
          respuesta.message = "Login exitoso.";
          respuesta.success = true;
        }
      }
      return respuesta;
    } catch (error) {
      throw new Error("No se pudo verificar el usuario");
    }
  };

  static requestConfirmationCode = async (userEmail: {
    email: string;
  }): Promise<crudRpta> => {
    const email = userEmail.email;
    const respuesta: crudRpta = {
      success: true,
      message: "",
    };
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        respuesta.success = false;
        respuesta.message = "El usuario no esta registrado";
        respuesta.status = 404;
      } else {
        if (user.confirmed) {
          respuesta.success = false;
          respuesta.message = "La cuenta ya esta activada";
          respuesta.status = 403;
        } else {
          const token = new Token();
          token.token = generateToken();
          token.user = user.id;
          AuthEmail.sendConfirmationEmail({
            email: user.email,
            name: user.name,
            token: token.token,
          });
          await token.save();
          respuesta.message = "Se envio el codigo a tu E-mail";
        }
      }
      return respuesta;
    } catch (error) {
      throw new Error("Error al envio codigo");
    }
  };
}
