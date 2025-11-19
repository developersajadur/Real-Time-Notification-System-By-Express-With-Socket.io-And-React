import { Types } from 'mongoose';

export interface IActivityLog {
  _id?: Types.ObjectId;
  message: string;
  task?: Types.ObjectId;
  fromMember?: Types.ObjectId;
  toMember?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
