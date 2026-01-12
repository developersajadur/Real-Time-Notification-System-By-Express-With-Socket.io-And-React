import { Types } from 'mongoose';

export interface ICategory {
  _id?: Types.ObjectId;
  name: string;
  description?: string;
  isActive: boolean;
  createdBy: 'SYSTEM' | 'ADMIN';
  createdAt?: Date;
  updatedAt?: Date;
}
