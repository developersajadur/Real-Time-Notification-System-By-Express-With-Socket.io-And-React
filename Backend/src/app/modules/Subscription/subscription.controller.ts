import status from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { subscriptionService } from './subscription.service';

const subscribeCategory = catchAsync(async (req, res) => {
  const userId = req.user.userId;

  const result = await subscriptionService.subscribeCategory(
    req.params.id as string,
    userId,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Category subscribed successfully',
    data: result,
  });
});

const unsubscribeCategory = catchAsync(async (req, res) => {
  const userId = req.user.userId;

  const result = await subscriptionService.unsubscribeCategory(
    req.params.id as string,
    userId,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Category unsubscribed successfully',
    data: result,
  });
});

const getMySubscriptions = catchAsync(async (req, res) => {
  const userId = req.user.userId;

  const result = await subscriptionService.getMySubscriptions(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Subscriptions retrieved successfully',
    data: result,
  });
});

const getSubscribedUserByCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;

  const result =
    await subscriptionService.getSubscribedUserByCategory(categoryId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Subscribed users retrieved successfully',
    data: result,
  });
});

export const subscriptionController = {
  subscribeCategory,
  unsubscribeCategory,
  getMySubscriptions,
  getSubscribedUserByCategory,
};
