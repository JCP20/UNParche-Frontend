import { backendApi } from "@/api/config";

export const createUser = async (input: any) => {
  const result = await backendApi.post("/users/register", { ...input });
  return result;
};
