import { Types } from "mongoose";
import { crudRpta } from "../types/types.response";
import Note from "../models/Note";
import { ITask } from "../models/Task";

type NoteCreateType = {
  content: string;
  task: ITask;
  userId: Types.ObjectId;
};

type NoteDeleteType = {
  noteId: Types.ObjectId;
  userId: NoteCreateType["userId"];
  task: ITask;
};

export class NoteDAO {
  static createNote = async ({
    content,
    task,
    userId,
  }: NoteCreateType): Promise<crudRpta> => {
    const respuesta: crudRpta = { success: true };
    const newNote = await new Note({
      content: content,
      task: task.id,
      createdBy: userId,
    });
    task.notes.push(newNote.id);
    try {
      await Promise.allSettled([newNote.save(), task.save()]);
      respuesta.message = "Nota creada!";
      return respuesta;
    } catch (error) {
      console.log(error);
      throw new Error("Hubo un error al crear una Nota");
    }
  };

  static getTaskNote = async (taskId: Types.ObjectId): Promise<crudRpta> => {
    const respuesta: crudRpta = { success: true };

    try {
      const notes = await Note.find({ task: taskId });
      if (!notes) {
        respuesta.message = "No hay notas en esta tarea.";
        respuesta.success = false;
      } else {
        respuesta.message = notes;
      }
      return respuesta;
    } catch (error) {
      console.log(error);
      throw new Error("Error al traer Notas");
    }
  };
  static deleteNote = async ({
    noteId,
    userId,
    task,
  }: NoteDeleteType): Promise<crudRpta> => {
    const respuesta: crudRpta = { success: false };
    try {
      const note = await Note.findById(noteId);

      if (!note) {
        respuesta.message = "Nota no encontrada";
        respuesta.status = 404;
      } else if (note.createdBy.toString() !== userId.toString()) {
        respuesta.message = "Accion no valida";
        respuesta.status = 401;
      } else {
        task.notes = task.notes.filter(
          (note) => note.toString() !== noteId.toString()
        );

        await Promise.allSettled([note.deleteOne(), task.save()]);
        respuesta.success = true;
        respuesta.message = "Nota eliminada!";
      }
      return respuesta;
    } catch (error) {
      console.log(error);
      throw new Error("Error desde deleteNote");
    }
  };
}
