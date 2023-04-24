import { backendApi } from "@/api/config";
import { IGroup } from "@/interfaces/groups";

export const listAllGroups = async (): Promise<IGroup[] | null> => {
  try {
    const { data } = await backendApi.get(`/groups`);
    return data.data as IGroup[];
  } catch (error) {
    return null;
  } 
};
export const createGroupFn = async (values:any): Promise<any| null> => {
  try {
    const { data } = await backendApi.post(`/groups/Register`,values);
    return data.data as IGroup[];
  } catch (error) {
    return null;
  } 
};
export const updateGroupFn = async (values:any, id: string): Promise<any| null> => {
  try {
    const { data } = await backendApi.post(`/groups/update/${id}`,values);
    return data.data as IGroup[];
  } catch (error) {
    return null;
  } 
};