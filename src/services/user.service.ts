import { backendApiPrivate } from "@/services/api/config";
import { IUser } from "@/interfaces/user";
import { AxiosResponse } from "axios";

export const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    const { data } = await backendApiPrivate.get(`/users/${id}`);
    return data.data as IUser;
  } catch (error: any) {
    return error.response;
  }
};

export const updateUserFn = async (
  id: string,
  input: IUser
): Promise<AxiosResponse<any> | null> => {
  try {
    const resp = await backendApiPrivate.put(`/users/${id}`, input);
    return resp;
  } catch (error: any) {
    return error.response;
  }
};
