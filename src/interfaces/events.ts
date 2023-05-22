import { IGroup } from "./groups";

export interface IEvent {
  _id: string;
  id: string;
  title: string;
  date: Date;
  description: string;
  group: IGroup | string;
  photo: string;
}
