import { backendApiPrivate } from "@/services/api/config";
import { AxiosResponse } from "axios";

export const createReport = async (body: {
    userId: string;
    eventId: string;
    reason: string;
}) => {
    const result = await backendApiPrivate.post("/reports/", body);
    return result;
};
  