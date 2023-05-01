import { backendApi } from "@/services/api/config";
import { AxiosResponse } from "axios";

export const createUser = async (input: {
  username: string;
  password: string;
  email: string;
  password_confirmation: string;
}) => {
  const result = await backendApi.post("/auth/register", input);
  return result;
};

export const loginUser = async (input: {
  password: string;
  email: string;
}): Promise<AxiosResponse<any>> => {
  try {
    const result = await backendApi.post("/auth/login", input, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return result;
  } catch (error) {
    throw new Error("Failed to login");
  }
};

export const logoutUser = async () => {
  const result = await backendApi.get("/auth/logout", {
    withCredentials: true,
  });
  return result;
};

export const renewToken = async () => {
  const result = await backendApi.get("/auth/renew", {
    withCredentials: true,
  });
  return result;
};

export const verifyEmailFn = async (
  id: string,
  input: { verified: boolean }
): Promise<AxiosResponse<any> | null> => {
  try {
    const resp = await backendApi.put(`/auth/verify/${id}`, input);
    return resp;
  } catch (error) {
    return null;
  }
};
