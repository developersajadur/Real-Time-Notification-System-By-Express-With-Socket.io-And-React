import { Types } from 'mongoose';

export interface ITeam {
  _id?: Types.ObjectId;
  name: string;
  owner: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
