import { IGroup } from "./groups";

export interface IEvent {
  _id: string;
  id: string;
  title: string;
  date: string | Date;
  description: string;
  group: IGroup | string;
  photo: string;
}
