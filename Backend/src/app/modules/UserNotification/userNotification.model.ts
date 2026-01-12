import { Schema, model } from 'mongoose';
import { IUserNotification } from './userNotification.interface';

const userNotificationSchema = new Schema<IUserNotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      index: true,
    },
    notificationId: {
      type: Schema.Types.ObjectId,
      ref: 'Notification',
      required: [true, 'Notification reference is required'],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);


userNotificationSchema.index(
  { userId: 1, notificationId: 1 },
  {
    unique: true,
    name: 'unique_user_notification',
  },
);

export const UserNotification = model<IUserNotification>(
  'UserNotification',
  userNotificationSchema,
);
