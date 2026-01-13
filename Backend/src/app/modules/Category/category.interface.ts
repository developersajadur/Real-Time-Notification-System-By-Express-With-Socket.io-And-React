import { Types } from 'mongoose';

export interface ICategory {
  _id?: Types.ObjectId;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
