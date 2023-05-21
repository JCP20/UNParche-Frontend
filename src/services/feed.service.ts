import { IEvent } from "@/interfaces/events";
import { backendApiPrivate } from "./api/config";

export const getFYPEvents = async (
  page: number,
  limit: number
): Promise<IEvent[]> => {
  try {
    const response = await backendApiPrivate.get(
      `/events/fypEvents/${page}/${limit}`
    );
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch FYP events.");
  }
};

export const getGroupEvents = async (
  page: number,
  limit: number
): Promise<IEvent[]> => {
  try {
    const response = await backendApiPrivate.get(
      `/events/groupEvents/${page}/${limit}`
    );
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch group events.");
  }
};
