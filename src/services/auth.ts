import { backendApi } from "@/api/config";

export const createUser = async (input: {
  username: string;
  password: string;
  email: string;
  password_confirmation: string;
}) => {
  const result = await backendApi.post("/users/register", input);
  return result;
};
export const loginUser = async (input: {
  password: string;
  email: string;
}) => {
  const result = await backendApi.post("/users/login", input);
  return result;
};
