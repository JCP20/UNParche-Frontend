export interface IGroup {
  _id: string;
  category: string;
  name: string;
  description: string;
  members: string[];
  administrators: string[];
  photo: string;
}
