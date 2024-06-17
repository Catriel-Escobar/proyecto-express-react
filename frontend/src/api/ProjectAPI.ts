import api from "@/lib/axios";
import { Project, ProjectFormData, dashboardProjectSchema } from "../types";
import { AxiosError } from "axios";

export async function CreateProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post("/projects/", formData);
    console.log(data);
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      console.log(error.response.data);
      throw new Error(error.response.data.error);
    }
    console.log(error);
  }
}

export async function GetProjects() {
  try {
    const { data } = await api("/projects/");
    const response = dashboardProjectSchema.safeParse(data);
    if (response.success) {
      return response.data;
    } else {
      throw new AxiosError("Invalid data");
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      console.log(error.response.data);
      throw new Error(error.response.data.error);
    }
    console.log(error);
  }
}

export async function GetProjectsById(id: Project["_id"]) {
  try {
    const { data } = await api(`/projects/${id}`);
    return data;
    // const response = dashboardProjectSchema.safeParse(data);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      console.log(error.response.data);
      throw new Error(error.response.data.error);
    }
    console.log(error);
  }
}
type ProjectAPItype = {
  formData: ProjectFormData;
  projectId: Project["_id"];
};

export async function updateProjectsById({
  formData,
  projectId,
}: ProjectAPItype) {
  try {
    const { data } = await api.put(`/projects/${projectId}`, formData);
    console.log(data);
    return data;
    // const response = dashboardProjectSchema.safeParse(data);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      console.log(error.response.data);
      throw new Error(error.response.data.error);
    }
    console.log(error);
  }
}

export async function deleteProject(id: Project["_id"]) {
  try {
    const { data } = await api.delete(`/projects/${id}`);
    console.log(data);
    return data;
    // const response = dashboardProjectSchema.safeParse(data);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      console.log(error.response.data);
      throw new Error(error.response.data.error);
    }
    console.log(error);
  }
}
