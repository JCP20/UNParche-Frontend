import { IGroup } from "@/interfaces/groups";
import { IUser } from "@/interfaces/user";
import { backendApiPrivate } from "./api/config";

export const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    const { data } = await backendApiPrivate.get(`/users/${id}`);
    return data.data as IUser;
  } catch (error) {
    return null;
  }
};

export const ownedGroups = async (id: string): Promise<any | null> => {
  try {
    const { data } = await backendApiPrivate.get(`/your-groups-admin/${id}`);
    return data.data as IGroup[];
  } catch (error) {
    return null;
  }
};

export const changeName = async (id: string): Promise<any | null> => {
  try {
    const { data } = await backendApiPrivate.post(`/users/${id}`);
    return data.data as IGroup[];
  } catch (error) {
    return null;
  }
};
