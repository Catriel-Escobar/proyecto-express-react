import api from "@/lib/axios";
import { ProjectFormData } from "../types";

export async function CreateProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post("/projects/", formData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
