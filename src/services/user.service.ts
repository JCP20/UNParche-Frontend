import { backendApiPrivate } from "@/services/api/config";
import { IUser } from "@/interfaces/user";
import { AxiosResponse } from "axios";
import { backendApi } from "@/services/api/config";

export const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    const { data } = await backendApiPrivate.get(`/users/${id}`);
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
    const resp = await backendApiPrivate.put(`/users/${id}`, input);
    return resp;
  } catch (error) {
    return null;
  }
};

export const getUByParamFn = async (body: {
  username: string
}): Promise<AxiosResponse<any> | null> => {
  try {
    const result = await backendApi.post("/users/getbyparam/", body);
    return result;
  } catch (error) { 
    return null;
  }
};