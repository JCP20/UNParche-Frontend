import { backendApi } from "@/api/config";
import { IUser } from "@/interfaces/user";

export const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    const { data } = await backendApi.get(`/users/${id}`);
    return data.data as IUser;
  } catch (error) {
    return null;
  }
};
