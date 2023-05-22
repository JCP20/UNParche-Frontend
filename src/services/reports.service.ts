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

export const reportEventFn = async (report: any) => {
  try {
    const resp = await backendApiPrivate.post(`/reports`, report);
    return resp.data;
  } catch (error) {
    throw new Error("Error en la creación de la denuncia");
  }
};

export const deleteReportsByEventFn = async (id: string) => {
  try {
    const resp = await backendApiPrivate.delete(`/reports/by-event/${id}`);
    return resp;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
