import { backendApi } from "@/api/config";
import { IEvent } from "@/interfaces/events";

export const createEventFn = async (values:any): Promise<any| null> => {
  try {
    const { data } = await backendApi.post(`/events/register`,values);
    return data.data as IEvent[];
  } catch (error) {
    return null;
  } 
};
export const updateEventFn = async (values:any, id: string): Promise<any| null> => {
  try {
    const { data } = await backendApi.post(`/events/update/${id}`,values);
    return data.data as IEvent[];
  } catch (error) {
    return null;
  } 
};