import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { notificationController } from './notification.controller';
import { notificationValidation } from './notification.validation';

const router = Router();

router.post(
  '/create',
  auth(USER_ROLE.ADMIN),
  validateRequest(notificationValidation.createNotificationSchema),
  notificationController.createNotification,
);

router.patch(
  '/update/:id',
  auth(USER_ROLE.ADMIN),
  validateRequest(notificationValidation.updateNotificationSchema),
  notificationController.updateNotification,
);

router.delete(
  '/delete/:id',
  auth(USER_ROLE.ADMIN),
  notificationController.deleteNotification,
);

router.get(
  '/me/category/:categoryId',
  auth(USER_ROLE.USER),
  notificationController.getMyNotificationsByCategory,
);

router.get(
  '/unread-count',
  auth(USER_ROLE.USER),
  notificationController.getUnreadCount,
);

router.patch(
  '/make-read/:notificationId',
  auth(USER_ROLE.USER),
  notificationController.markAsRead,
);

router.patch(
  '/make-unread/:notificationId',
  auth(USER_ROLE.USER),
  notificationController.markAsUnread,
);

router.get(
  '/user/:userId',
  auth(USER_ROLE.ADMIN),
  notificationController.getUserNotificationsByAdmin,
);

export const notificationRoutes = router;
