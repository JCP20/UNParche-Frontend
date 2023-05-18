import { backendApiPrivate } from "./api/config";

export const getAllStaticsFn = async (): Promise<any | false> => {
  try {
    const { data } = await backendApiPrivate.get(`/statistics`);
    return data.data as any;
  } catch (error) {
    return false;
  }
};
