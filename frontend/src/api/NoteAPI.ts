import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Note, NoteFormData, Project, Task } from "../types";

type NoteAPIType = {
  formData: NoteFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
  noteId: Note["_id"];
};
export async function createNote({
  projectId,
  taskId,
  formData,
}: Pick<NoteAPIType, "projectId" | "taskId" | "formData">) {
  //localhost:4000/api/projects/667750c2c48b4a091b581dcf/tasks/6677a5475f32e69f024fb245/notes
  const url = `/projects/${projectId}/tasks/${taskId}/notes`;
  try {
    const { data } = await api.post(url, formData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteNote({
  projectId,
  taskId,
  noteId,
}: Pick<NoteAPIType, "projectId" | "taskId" | "noteId">) {
  const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
  try {
    const { data } = await api.delete(url);
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
