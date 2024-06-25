import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import Task, { ITask } from "./Task";
import { IUser } from "./User";
import Note from "./Note";

export interface IProject extends Document {
  projectName: string;
  clientName: string;
  description: string;
  tasks: PopulatedDoc<ITask & Document>[];
  manager: PopulatedDoc<IUser & Document>;
  team: PopulatedDoc<IUser & Document>[];
}

const ProjectSchema: Schema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tasks: [
      {
        type: Types.ObjectId,
        ref: "Task",
      },
    ],
    manager: {
      type: Types.ObjectId,
      ref: "User",
    },
    team: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

// ProjectSchema.pre("deleteOne", { document: true }, async function () {
//   const projectId = this.id;
//   await Task.deleteMany({ project: projectId });
// });

ProjectSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const tasks = await Task.find({ _id: { $in: this.tasks } });
      for (const task of tasks) {
        await Note.deleteMany({ task: task._id });
        await task.deleteOne();
      }

      next();
    } catch (err) {
      console.log("error borrando el proyecto y sus derivados.");
      next();
    }
  }
);

const Project = mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
