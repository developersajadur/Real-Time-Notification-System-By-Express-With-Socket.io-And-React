import { Types } from 'mongoose';

export interface IProject {
  _id?: Types.ObjectId;
  name: string;
  description?: string;
  team: Types.ObjectId;
  owner: Types.ObjectId; // user
  createdAt?: Date;
  updatedAt?: Date;
}
