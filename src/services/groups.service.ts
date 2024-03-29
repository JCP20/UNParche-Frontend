import { IGroup } from "@/interfaces/groups";
import { backendApiPrivate } from "./api/config";

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
    const { data } = await backendApiPrivate.post(`/groups/`, values);
    return data;
  } catch (error: any) {
    return error.response;
  }
};

export const updateGroupFn = async (input: {
  values: any;
  groupId: string;
}): Promise<any | null> => {
  try {
    const { groupId, ...bodyInfo } = input;
    const { data } = await backendApiPrivate.patch(
      `/groups/update/${input.groupId}`,
      bodyInfo
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

export const deleteGroupFn = async (id: string) => {
  try {
    const resp = await backendApiPrivate.delete(`/groups/${id}`);
    return resp;
  } catch (error: any) {
    return error.response;
  }
};

export const enrollUserToGroupFn = async (
  memberId: string,
  groupId: string
) => {
  try {
    const resp = await backendApiPrivate.patch(`/groups/enroll`, {
      memberId,
      groupId,
    });
    return resp;
  } catch (error: any) {
    return false;
  }
};

export const removeUserFromGroupFn = async (
  memberId: string,
  groupId: string
) => {
  try {
    const resp = await backendApiPrivate.patch(`/groups/removeMember`, {
      memberId,
      groupId,
    });
    return resp;
  } catch (error: any) {
    return false;
  }
};
