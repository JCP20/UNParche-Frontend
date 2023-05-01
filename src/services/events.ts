import { IEvent } from "@/interfaces/events";
import { backendApi } from "./api/config";

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

export const getEventsUserFn = async (values:any, id: string): Promise<any| null> => {
  try {
    const { data } = await backendApi.post(`/events/update/${id}`,values);
    return data.data as IEvent[];
  } catch (error) {
    return null;
  } 
};

export const getEventsUserDateFn = async (values:any, id: string): Promise<any| null> => {
  try {
    const { data } = await backendApi.post(`/events/update/${id}`,values);
    return data.data as IEvent[];
  } catch (error) {
    return null;
  } 
};