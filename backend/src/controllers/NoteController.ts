import { Request, Response } from "express";
import Note, { INote } from "../models/Note";
import { NoteDAO } from "../dao/NoteDAO";
import { ITask } from "../models/Task";
export class NoteController {
  static createNote = async (req: Request, res: Response) => {
    const { content } = req.body;
    const task: ITask = req.task;
    const userId = req.user?.id;
    try {
      const { success, message } = await NoteDAO.createNote({
        content,
        task,
        userId,
      });
      res.send({ message });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Hubo un error en el servidor" });
    }
  };
  static getTaskNote = async (req: Request, res: Response) => {
    try {
      const { success, message } = await NoteDAO.getTaskNote(req.task.id);
      success ? res.send(message) : res.status(404).send({ error: message });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Hubo un error en el servidor" });
    }
  };
  static deleteNote = async (req: Request, res: Response) => {
    const { noteId } = req.params;
    try {
    } catch (error) {}
  };
}
