import mongoose, { Schema, Document, Types } from "mongoose";
import Note from "./Note";

const tasksStatus = {
  PENDING: "pending",
  ON_HOLD: "onHold",
  IN_PROGRESS: "inProgress",
  UNDER_REVIEW: "underReview",
  COMPLETED: "completed",
} as const;

export type TaskStatus = (typeof tasksStatus)[keyof typeof tasksStatus];

export interface ITask extends Document {
  name: string;
  description: string;
  project: Types.ObjectId;
  status: TaskStatus;
  completedBy: {
    user: Types.ObjectId | null;
    status: TaskStatus;
  }[];
  notes: Types.ObjectId[];
}

const TaskSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    project: {
      type: Types.ObjectId,
      ref: "Project",
    },
    status: {
      type: String,
      enum: Object.values(tasksStatus),
      default: tasksStatus.PENDING,
    },
    completedBy: [
      {
        user: {
          type: Types.ObjectId,
          ref: "User",
          default: null,
        },
        status: {
          type: String,
          enum: Object.values(tasksStatus),
          default: tasksStatus.PENDING,
        },
      },
    ],
    notes: [
      {
        type: Types.ObjectId,
        ref: "Note",
      },
    ],
  },
  { timestamps: true }
);

//! MIDDLEWARE DE MONGOOSE

TaskSchema.pre(
  "deleteOne",
  {
    document: true,
  },
  async function () {
    console.log(this.id);
    const taskId = this.id;
    if (!taskId) return;
    await Note.deleteMany({ task: taskId });
  }
);

const Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
