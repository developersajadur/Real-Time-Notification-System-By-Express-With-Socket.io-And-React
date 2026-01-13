import { Types } from 'mongoose';
import { Notification } from './notification.model';
import { socketEmitter } from '../../socket/emitter';
import { subscriptionService } from '../Subscription/subscription.service';
import { UserNotification } from '../UserNotification/userNotification.model';
import { categoryService } from '../Category/category.service';
import { ICreateNotificationPayload } from './notification.interface';
import AppError from '../../errors/AppError';
import status from 'http-status';

const createNotification = async (
  payload: ICreateNotificationPayload,
  adminId: string,
) => {
  await categoryService.getCategoryById(payload.categoryId);
  const notification = await Notification.create({
    title: payload.title,
    message: payload.message,
    categoryId: new Types.ObjectId(payload.categoryId),
    createdBy: new Types.ObjectId(adminId),
  });

  const subscribedUsers = await subscriptionService.getSubscribedUserByCategory(
    payload.categoryId,
  );

  if (subscribedUsers.length === 0) {
    return {
      notification,
      recipients: [],
    };
  }

  const userNotifications = subscribedUsers.map((user) => ({
    userId: user._id,
    notificationId: notification._id,
  }));

  await UserNotification.insertMany(userNotifications);

  subscribedUsers.forEach((user) => {
    socketEmitter.emitToUser(user?._id.toString(), 'new-notification', {
      id: notification._id,
      title: notification.title,
      message: notification.message,
      categoryId: notification.categoryId,
      createdAt: notification.createdAt,
    });
  });

  return {
    notification,
    recipients: subscribedUsers,
  };
};

const updateNotification = async (
  notificationId: string,
  payload: Partial<{ title: string; message: string }>,
) => {
  const notification = await Notification.findByIdAndUpdate(
    notificationId,
    payload,
    { new: true },
  );

  if (!notification) {
    throw new AppError(status.NOT_FOUND, 'Notification not found');
  }

  const userNotifications = await UserNotification.find({
    notificationId,
  }).select('userId');

  userNotifications.forEach(({ userId }) => {
    socketEmitter.emitToUser(userId.toString(), 'update-notification', {
      id: notification._id,
      title: notification.title,
      message: notification.message,
      categoryId: notification.categoryId,
      updatedAt: notification.updatedAt,
    });
  });

  return notification;
};

const deleteNotification = async (notificationId: string) => {
  const notification = await Notification.findById(notificationId);

  if (!notification) {
    throw new AppError(status.NOT_FOUND, 'Notification not found');
  }

  const userNotifications = await UserNotification.find({
    notificationId,
  }).select('userId');

  await Promise.all([
    Notification.deleteOne({ _id: notificationId }),
    UserNotification.deleteMany({ notificationId }),
  ]);

  userNotifications.forEach(({ userId }) => {
    socketEmitter.emitToUser(userId.toString(), 'delete-notification', {
      notificationId,
    });
  });

  return null;
};

const getMyNotificationsByCategory = async (
  userId: string,
  categoryId: string,
) => {
  return UserNotification.find({
    userId: new Types.ObjectId(userId),
  })
    .populate({
      path: 'notificationId',
      match: {
        categoryId: new Types.ObjectId(categoryId),
      },
      select: 'title message categoryId createdAt',
    })
    .sort({ createdAt: -1 })
    .lean()
    .then((results) => results.filter((item) => item.notificationId !== null));
};

const markAsRead = async (userId: string, notificationId: string) => {
  const result = await UserNotification.findOneAndUpdate(
    {
      userId: new Types.ObjectId(userId),
      notificationId: new Types.ObjectId(notificationId),
    },
    {
      isRead: true,
    },
    {
      new: true,
      select: { isRead: 1 },
    },
  );
  if (!result) {
    throw new AppError(
      status.NOT_FOUND,
      'Notification not found for this user',
    );
  }
  return result;
};

const markAsUnread = async (userId: string, notificationId: string) => {
  const result = await UserNotification.findOneAndUpdate(
    {
      userId: new Types.ObjectId(userId),
      notificationId: new Types.ObjectId(notificationId),
    },
    {
      isRead: false,
    },
    {
      new: true,
      select: { isRead: 1 },
    },
  );
  if (!result) {
    throw new AppError(
      status.NOT_FOUND,
      'Notification not found for this user',
    );
  }
  return result;
};

const getUnreadCount = async (userId: string) => {
  return UserNotification.countDocuments({
    userId: new Types.ObjectId(userId),
    isRead: false,
  });
};

const getUserNotificationsByAdmin = async (userId: string) => {
  const notifications = await UserNotification.find({
    userId: new Types.ObjectId(userId),
  })
    .populate({
      path: 'notificationId',
      select: 'title message categoryId createdAt',
    })
    .sort({ createdAt: -1 })
    .lean();

  if (!notifications) {
    throw new AppError(
      status.NOT_FOUND,
      'No notifications found for this user',
    );
  }

  return notifications;
};

export const notificationService = {
  createNotification,
  updateNotification,
  deleteNotification,
  getMyNotificationsByCategory,
  markAsRead,
  markAsUnread,
  getUnreadCount,
  getUserNotificationsByAdmin,
};
