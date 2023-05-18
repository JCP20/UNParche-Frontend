import { IEvent } from "./events";
import { IUser } from "./user";

export interface IReportsGrouped {
  count: number;
  event: IEvent;
  reports: IReports[];
}

export interface IReports {
  _id: string;
  user: IUser | string;
  reason: string;
}
