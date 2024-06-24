import { Request, Response } from "express";
import { NoteDAO } from "../dao/NoteDAO";
import { ITask } from "../models/Task";
import { Types } from "mongoose";

type NoteParamsType = {
  noteId: Types.ObjectId;
};

export class NoteController {
  static createNote = async (req: Request, res: Response) => {
    const { content } = req.body;
    const task = req.task;
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
    const noteId = new Types.ObjectId(req.params.noteId);
    const userId = req.user?.id;
    const task = req.task;
    try {
      const { success, message, status } = await NoteDAO.deleteNote({
        noteId,
        userId,
        task,
      });
      success
        ? res.send({ message: message })
        : res.status(status!).send({ error: message });
    } catch (error) {}
  };
}
