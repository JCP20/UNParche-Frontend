import { IUser } from "@/interfaces/user";
import { AxiosResponse } from "axios";
import { backendApiPrivate } from "./api/config";

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

export const listAllUsersFn = async () => {
  try {
    const { data } = await backendApiPrivate.get("/users");
    return data.data;
  } catch (error: any) {
    return error.response;
  }
};

export const deleteUserFn = async (id: string) => {
  try {
    const resp = await backendApiPrivate.delete(`/users/${id}`);
    return resp;
  } catch (error: any) {
    return error.response;
  }
};

export const listUsersForSearchFn = async (username: string) => {
  try {
    const resp = await backendApiPrivate.get(`/users/search/${username}`);
    return resp.data;
  } catch (error: any) {
    return error?.response;
  }
};
