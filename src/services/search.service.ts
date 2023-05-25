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

export const getFYPData = async (page: number, limit: number) => {
  try {
    const response = await backendApiPrivate.get(
      `/search/fypData/${page}/${limit}`
    );
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch FYP data.");
  }
};
