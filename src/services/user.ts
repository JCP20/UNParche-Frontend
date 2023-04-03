import { backendApi } from "@/api/config";
import { IUser } from "@/interfaces/user";
import { AxiosResponse } from "axios";

export const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    const { data } = await backendApi.get(`/users/${id}`);
    return data.data as IUser;
  } catch (error) {
    return null;
  }
};

export const updateUserFn = async (
  id: string,
  input: IUser
): Promise<AxiosResponse<any> | null> => {
  try {
    const resp = await backendApi.put(`/users/${id}`, input);
    return resp;
  } catch (error) {
    return null;
  }
};
