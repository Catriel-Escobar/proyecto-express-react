import api from "@/lib/axios";

import { isAxiosError } from "axios";
import {
  CheckPasswordForm,
  UpdateCurrentPasswordUser,
  UserProfileForm,
} from "../types";

type ResponseMessage = {
  message: string;
};

export async function updateProfile(formData: UserProfileForm) {
  try {
    const url = `/profile`;
    const { data } = await api.put<ResponseMessage>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al updatear el Profile");
  }
}

export async function updateCurrentPasswordUser(
  formData: UpdateCurrentPasswordUser
) {
  const url = `/profile/update-password`;
  try {
    const { data } = await api.post<ResponseMessage>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al cambiar password");
  }
}

export async function checkPasswordUser(formData: CheckPasswordForm) {
  const url = `/profile/check-password`;
  try {
    const { data } = await api.post<ResponseMessage>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al cambiar password");
  }
}
