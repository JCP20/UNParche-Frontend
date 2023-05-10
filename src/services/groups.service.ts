import { backendApiPrivate } from "@/services/api/config";
import { IGroup } from "@/interfaces/groups";

export const listAllGroups = async (): Promise<IGroup[] | null> => {
  try {
    const { data } = await backendApiPrivate.get(`/groups`);
    return data.data as IGroup[];
  } catch (error) {
    return null;
  }
};
export const GroupsfromAdmin = async (id: string
): Promise<IGroup[] | null> => {
  try {
    const { data } = await backendApiPrivate.get(`/groups/your-groups-admin/${id}`);
    return data.data as IGroup[];
  } catch (error) {
    return null;
  }
};
export const createGroupFn = async (values: any): Promise<any | null> => {
  try {
    const { data } = await backendApiPrivate.post(`/groups/Register`, values);
    return data.data as IGroup[];
  } catch (error) {
    return null;
  }
};
export const updateGroupFn = async ({values,idGroup,idUser}: { values: any; idGroup: string; idUser: string
}): Promise<any | null> => {
  try {
    const { data } = await backendApiPrivate.post(
      `/groups/update/${idGroup}/$${idUser}`,
      values
    );
    return data.data as IGroup[];
  } catch (error) {
    return null;
  }
};
