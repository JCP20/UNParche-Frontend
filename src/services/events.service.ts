import { backendApiPrivate } from "@/services/api/config";
import { IEvent } from "@/interfaces/events";

export const createEventFn = async (values: any): Promise<any | null> => {
  try {
    const { data } = await backendApiPrivate.post(`/events/register`, values);
    return data.data as IEvent[];
  } catch (error) {
    return null;
  }
};
export const deleteEventFn = async (id:string)  => {
  try {
    const { data } = await backendApiPrivate.delete(`/events/${id}`);
    return data.data as IEvent[];
  } catch (error) {
    return null;
  }
};
export const EventsGroup = async (id:string): Promise<IEvent[] | null> => {
  try {
    const { data } = await backendApiPrivate.get(`/events/your-events/${id}`);
    return data.data as IEvent[];
  } catch (error) {
    return null;
  }
};
export const updateEventFn = async (
  values: any,
  id: string
): Promise<any | null> => {
  try {
    const { data } = await backendApiPrivate.post(
      `/events/update/${id}`,
      values
    );
    return data.data as IEvent[];
  } catch (error) {
    return null;
  }
};
