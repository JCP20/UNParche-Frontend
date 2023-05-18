import { IGroup } from "./groups";

export interface IEvent {
  id: string;
  title: string;
  date: Date;
  description: string;
  group: IGroup | string;
  photo: string;
}
