import { IReportsGrouped } from "@/interfaces/reports";
import { backendApiPrivate } from "./api/config";

export const listAllReportsFn = async (): Promise<
  IReportsGrouped[] | false
> => {
  try {
    const { data } = await backendApiPrivate.get(`/reports`);
    return data.data as IReportsGrouped[];
  } catch (error) {
    return false;
  }
};
