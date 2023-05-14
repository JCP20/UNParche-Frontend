import { backendApiPrivate } from "@/services/api/config";
import { IEvent } from "@/interfaces/events";

export const createEventFn = async (values: any): Promise<any | null> => {
  try {
    const { data } = await backendApiPrivate.post(`/events/`, values);
    return data.data as IEvent[];
  } catch (error) {
    return null;
  }
};
export const updateEventFn = async ({ values, idEvent }: { values: any; idEvent: string; }): Promise<any | null> => {
  try {
    const { data } = await backendApiPrivate.put(
      `/events/${idEvent}`,
      values
    );
    return data.data as IEvent[];
  } catch (error) {
    return null;
  }
};
export const getEventsUserFn = async (id: string): Promise<any | null> => {
  try {
    const { data } = await backendApiPrivate.get(`/events/${id}`);
    return data.data as IEvent[];
  } catch (error) {
    return null;
  }
};
export const highlightEventFn = async (body: {
  username: string;
  eventId: string;
}) => {
  const result = await backendApiPrivate.put("/events/highlight/", body);
  return result;
};
export const removeHighlightFn = async (body: {
  username: string;
  eventId: string;
}) => {
  const result = await backendApiPrivate.put("/events/removeHighlight/", body);
  return result;
};