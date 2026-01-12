import { Types } from 'mongoose';

export interface IUserNotification {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  notificationId: Types.ObjectId;
  isRead: boolean;
  readAt?: Date;
  createdAt?: Date;
}
