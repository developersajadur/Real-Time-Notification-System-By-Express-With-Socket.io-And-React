import { Types } from 'mongoose';

export interface INotification {
  _id?: Types.ObjectId;
  title: string;
  message: string;
  categoryId: Types.ObjectId;
  createdBy: Types.ObjectId;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface ICreateNotificationPayload {
  title: string;
  message: string;
  categoryId: string;
}