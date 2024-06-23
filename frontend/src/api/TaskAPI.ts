import api from "@/lib/axios";
import { Project, Task, TaskFormData, taskSchema } from "../types";
import { AxiosError, isAxiosError } from "axios";

type TaskAPI = {
  taskForm: TaskFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
  status: Task["status"];
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
}: Pick<TaskAPI, "projectId" | "taskId">): Promise<Task> {
  const url = `/projects/${projectId}/tasks/${taskId}`;
  try {
    const { data } = await api.get(url);
    const response = taskSchema.safeParse(data);
    if (response.success) {
      return response.data;
    } else {
      throw new AxiosError("Invalid data format");
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("An unexpected error occurred");
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

export async function deleteTask({
  projectId,
  taskId,
}: Pick<TaskAPI, "projectId" | "taskId">) {
  const url = `/projects/${projectId}/tasks/${taskId}`;
  try {
    const { data } = await api.delete(url);
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateStatus({
  projectId,
  taskId,
  status,
}: Pick<TaskAPI, "projectId" | "taskId" | "status">) {
  const url = `/projects/${projectId}/tasks/${taskId}/status`;
  try {
    const { data } = await api.post(url, { status });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
