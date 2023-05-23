import { IEvent } from "@/interfaces/events";
import { backendApiPrivate } from "./api/config";

export const createEventFn = async (values: any): Promise<any | null> => {
  try {
    const { data } = await backendApiPrivate.post(`/events/`, values);
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

export const getEventsByGroupFn = async (id: string) => {
  try {
    const { data } = await backendApiPrivate.get(`/events/your-events/${id}`);
    return data.data as IEvent[];
  } catch (error: any) {
    return error.response;
  }
};

// listar todos los eventos DENUNCIADOS
export const listAllEventsFn = async () => {
  try {
    const { data } = await backendApiPrivate.get("/events/");
    return data.data;
  } catch (error: any) {
    return error.response;
  }
};

export const deleteEventFn = async (id: string) => {
  try {
    const resp = await backendApiPrivate.delete(`/events/${id}`);
    return resp;
  } catch (error: any) {
    throw new Error("Error eliminando evento");
  }
};

export const addUserToEventFn = async (id: string) => {
  try {
    const resp = await backendApiPrivate.patch(`/events/add-user/${id}`);
    return resp;
  } catch (error: any) {
    throw new Error("Error agregando usuario al evento");
  }
};

export const removeUserFromEventFn = async (id: string) => {
  try {
    const resp = await backendApiPrivate.patch(`/events/remove-user/${id}`);
    return resp;
  } catch (error: any) {
    throw new Error("Error eliminando usuario del evento");
  }
};

export const getEventFn = async (id: string) => {
  try {
    const { data } = await backendApiPrivate.get(`/events/get-event/${id}`);
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Error obteniendo eventos");
  }
};
