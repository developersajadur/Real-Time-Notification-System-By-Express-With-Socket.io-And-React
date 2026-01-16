import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { subscriptionController } from './subscription.controller';

const router = Router();

router.post(
  '/subscribe/:id',
  auth(USER_ROLE.USER),
  subscriptionController.subscribeCategory,
);

router.post(
  '/unsubscribe/:id',
  auth(USER_ROLE.USER),
  subscriptionController.unsubscribeCategory,
);

router.get(
  '/me',
  auth(USER_ROLE.USER),
  subscriptionController.getMySubscriptions,
);

router.get(
  '/subscribed-users/:categoryId',
  auth(USER_ROLE.ADMIN),
  subscriptionController.getSubscribedUserByCategory,
);

export const subscriptionRoutes = router;
