import { AxiosError, isAxiosError } from "axios";
import api from "@/lib/axios";
import {
  Project,
  TeamMember,
  TeamMemberArraySchema,
  TeamMemberForm,
} from "../types";

export async function findUserByEmail({
  projectId,
  formData,
}: {
  projectId: Project["_id"];
  formData: TeamMemberForm;
}) {
  try {
    const url = `projects/${projectId}/team/find`;
    const { data } = await api.post(url, formData);
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function addUserToProject({
  projectId,
  id,
}: {
  projectId: Project["_id"];
  id: TeamMember["_id"];
}) {
  try {
    const url = `projects/${projectId}/team`;
    const { data } = await api.post(url, { id });
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getProjectTeam(projectId: Project["_id"]) {
  try {
    const url = `projects/${projectId}/team`;
    const { data } = await api.get(url);
    const response = TeamMemberArraySchema.safeParse(data);
    if (response.success) {
      return response.data;
    } else {
      throw new AxiosError("Ocurrio un error zarpado.");
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function removeUserToProject({
  projectId,
  userId,
}: {
  projectId: Project["_id"];
  userId: TeamMember["_id"];
}) {
  try {
    const url = `projects/${projectId}/team/${userId}`;
    const { data } = await api.delete(url);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
