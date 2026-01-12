import { Types } from 'mongoose';

export interface ISubscription {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  categoryIds: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
