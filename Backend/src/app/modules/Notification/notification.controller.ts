import status from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { notificationService } from './notification.service';

const createNotification = catchAsync(async (req, res) => {
  const adminId = req.user.userId;
  const result = await notificationService.createNotification(
    req.body,
    adminId,
  );

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Notification created and delivered successfully',
    data: result.notification,
  });
});

const updateNotification = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await notificationService.updateNotification(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Notification updated successfully',
    data: result,
  });
});

const deleteNotification = catchAsync(async (req, res) => {
  const { id } = req.params;

  await notificationService.deleteNotification(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Notification deleted successfully',
    data: null,
  });
});

const getMyNotificationsByCategory = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const { categoryId } = req.params;

  const result =
    await notificationService.getMyNotificationsByCategory(
      userId,
      categoryId,
    );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Category-wise notifications retrieved successfully',
    data: result,
  });
});
const markAsRead = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const { notificationId } = req.params;

  const result = await notificationService.markAsRead(userId, notificationId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Notification marked as read',
    data: result,
  });
});

const markAsUnread = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const { notificationId } = req.params;

  const result = await notificationService.markAsUnread(userId, notificationId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Notification marked as unread',
    data: result,
  });
});

const getUnreadCount = catchAsync(async (req, res) => {
  const userId = req.user.userId;

  const count = await notificationService.getUnreadCount(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Unread notification count retrieved successfully',
    data: { count },
  });
});

const getUserNotificationsByAdmin = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await notificationService.getUserNotificationsByAdmin(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User notifications retrieved successfully',
    data: result,
  });
});

export const notificationController = {
  createNotification,
  updateNotification,
  deleteNotification,
  getMyNotificationsByCategory,
  markAsRead,
  markAsUnread,
  getUnreadCount,
  getUserNotificationsByAdmin,
};
