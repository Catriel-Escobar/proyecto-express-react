import api from "@/lib/axios";
import { Project, Task, TaskFormData, taskSchema } from "../types";
import { AxiosError, isAxiosError } from "axios";

type TaskAPI = {
  taskForm: TaskFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
};

export async function createTask({
  taskForm,
  projectId,
}: Pick<TaskAPI, "taskForm" | "projectId">) {
  try {
    const url = `/projects/${projectId}/tasks`;
    const { data } = await api.post(url, taskForm);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getTaskById({
  projectId,
  taskId,
}: Pick<TaskAPI, "projectId" | "taskId">) {
  const url = `/projects/${projectId}/tasks/${taskId}`;
  try {
    const { data } = await api(url);
    const response = taskSchema.safeParse(data);
    if (response.success) {
      return response.data;
    } else {
      throw new AxiosError("Error");
    }
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateTask({
  projectId,
  taskId,
  taskForm,
}: Pick<TaskAPI, "projectId" | "taskId" | "taskForm">) {
  const url = `/projects/${projectId}/tasks/${taskId}`;
  try {
    const { data } = await api.put(url, taskForm);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
