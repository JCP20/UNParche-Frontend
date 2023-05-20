import { backendApiPrivate } from "./api/config";

export const getFilteredGroupsAndUsersFn = async (
  input: any
): Promise<any | false> => {
  try {
    const { data } = await backendApiPrivate.post(`/search`, input);
    return data.data as any;
  } catch (error) {
    return false;
  }
};
