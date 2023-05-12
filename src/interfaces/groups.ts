import { IUser } from "./user";

export interface IGroup {
  _id: string;
  name: string;
  description: string;
  members: string[] | IUser[];
  administrators: string[] | IUser[];
  category: string;
  photo: string;
}
