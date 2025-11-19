import { Types } from 'mongoose';

export interface IMember {
  _id?: Types.ObjectId;
  team: Types.ObjectId;
  name: string;
  role: string;
  capacity: number; // 0–5
  createdAt?: Date;
  updatedAt?: Date;
}
