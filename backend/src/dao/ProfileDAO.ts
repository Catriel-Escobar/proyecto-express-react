import User, { IUser } from "../models/User";
import { crudRpta } from "../types/types.response";
import { comparePassword, hashPassword } from "../utils/hashing";

export class ProfileDAO {
  static updateProfile = async (
    name: string,
    email: string,
    user: IUser
  ): Promise<crudRpta> => {
    const respuesta: crudRpta = { success: true };
    try {
      const userExists = await User.findOne({ email });
      if (userExists && userExists.id.toString() !== user.id.toString()) {
        respuesta.success = false;
        respuesta.message = "El email ya esta registrado";
        respuesta.status = 409;
      }
      user.name = name;
      user.email = email;
      await user.save();
      respuesta.message = "Usuario actualizado correctamente";
      return respuesta;
    } catch (error) {
      console.log(error);
      throw new Error("Hubo un error al update profile");
    }
  };
  static updateCurrentUserPassword = async (
    current_password: string,
    password: string,
    user: IUser
  ): Promise<crudRpta> => {
    const respuesta: crudRpta = { success: true };
    try {
      const userUpdate = await User.findById(user.id);

      const isPasswordCorrect = await comparePassword(
        current_password,
        userUpdate!.password
      );
      if (!isPasswordCorrect) {
        respuesta.success = false;
        respuesta.message = "El password actual es incorrecto";
        respuesta.status = 401;
      } else {
        userUpdate!.password = await hashPassword(password);
        await userUpdate!.save();
        respuesta.message = "Password actualizada!";
      }
      return respuesta;
    } catch (error) {
      console.log(error);
      throw new Error("Error al actualizar passwordd");
    }
  };
}
