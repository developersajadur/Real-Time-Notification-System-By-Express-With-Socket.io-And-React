import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { subscriptionController } from './subscription.controller';
import { subscriptionValidation } from './subscription.validation';

const router = Router();

router.post(
  '/subscribe',
  auth(USER_ROLE.USER),
  validateRequest(subscriptionValidation.subscribeCategorySchema),
  subscriptionController.subscribeCategory,
);

router.post(
  '/unsubscribe',
  auth(USER_ROLE.USER),
  validateRequest(subscriptionValidation.unsubscribeCategorySchema),
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
