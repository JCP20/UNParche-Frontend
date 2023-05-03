import { backendApi } from "@/api/config";
import { IGroup } from "@/interfaces/groups";
import { IUser } from "@/interfaces/user";

export const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    const { data } = await backendApi.get(`/users/${id}`);
    return data.data as IUser;
  } catch (error) {
    return null;
  }
};
export const myGroupsShow = async (id: string): Promise<any| null> => {
    try {
      const { data } = await backendApi.get(`/your-groups/${id}`);
      return data.data as IGroup[];
    } catch (error) {
      return null;
    } 
  };
  export const ownedGroups = async (id: string): Promise<any| null> => {
    try {
      const { data } = await backendApi.get(`/your-groups-admin/${id}`);
      return data.data as IGroup[];
    } catch (error) {
      return null;
    } 
  };
  export const changeName = async (id: string): Promise<any| null> => {
    try {
      const { data } = await backendApi.post(`/users/${id}`);
      return data.data as IGroup[];
    } catch (error) {
      return null;
    } 
  }; 
 