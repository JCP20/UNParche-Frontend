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
