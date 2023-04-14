import { backendApi } from "@/api/config";
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
  const result = await backendApi.post("/auth/login", input);
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
