import { IGroup } from "./groups";

export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  verified: boolean;
  groups: string[] | IGroup[];
  preferredCategories: string[];
  role: string;
  photo: string;
}
