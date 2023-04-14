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
