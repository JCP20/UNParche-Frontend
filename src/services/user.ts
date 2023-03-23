import { backendApi } from "@/api/config";
import { IUser } from "@/types";

export const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    const { data } = await backendApi.get(`/users/${id}`);
    return data.data as IUser;
  } catch (error) {
    return null;
  }
};
