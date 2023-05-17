import { backendApiPrivate } from "@/services/api/config";
import { IGroup } from "@/interfaces/groups";
import { AxiosError, AxiosResponse } from "axios";

export const listAllGroupsFn = async (): Promise<IGroup[] | false> => {
  try {
    const { data } = await backendApiPrivate.get(`/groups`);
    return data.data as IGroup[];
  } catch (error: any) {
    return false;
  }
};

export const GroupsfromAdmin = async (): Promise<IGroup[] | false> => {
  try {
    const { data } = await backendApiPrivate.get(
      `/groups/your-groups-admin/:userId`
    );
    return data.data as IGroup[];
  } catch (error) {
    return false;
  }
};
export const createGroupFn = async (values: any): Promise<any> => {
  try {
    console.log(values);
    const { data } = await backendApiPrivate.post(`/groups/`, values);
    return data;
  } catch (error: any) {
    return error.response;
  }
};
export const updateGroupFn = async ({
  values,
  id,
}: {
  values: any;
  id: string;
}): Promise<any | null> => {
  try {
    const { data } = await backendApiPrivate.post(
      `/groups/update/${id}`,
      values
    );
    return data.data as IGroup;
  } catch (error) {
    return null;
  }
};

export const getGroupsByUserFn = async (id: string): Promise<any | null> => {
  try {
    const resp = await backendApiPrivate.get(`/groups/your-groups/${id}`);
    return resp.data as IGroup[];
  } catch (error) {
    return null;
  }
};

export const getGroupById = async (id: string): Promise<any | null> => {
  try {
    const { data } = await backendApiPrivate.get(`/groups/profile/${id}`);
    return data as IGroup;
  } catch (error: any) {
    return error.response;
  }
};
