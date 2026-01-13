/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import { categoryService } from '../Category/category.service';
import { Subscription } from './subscription.model';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { ISubscribedUser, ISubscription } from './subscription.interface';

const subscribeCategory = async (
  categoryId: string,
  userId: string,
): Promise<ISubscription | null> => {
  await categoryService.getCategoryById(categoryId);

  const subscription = await Subscription.findOneAndUpdate(
    { userId: new Types.ObjectId(userId) },
    {
      $addToSet: {
        categoryIds: new Types.ObjectId(categoryId),
      },
    },
    {
      new: true,
      upsert: true,
    },
  );

  return subscription;
};

const unsubscribeCategory = async (
  categoryId: string,
  userId: string,
): Promise<ISubscription | null> => {
  const subscription = await Subscription.findOne({ userId });

  if (!subscription) {
    throw new AppError(
      status.NOT_FOUND,
      'Subscription not found for this user',
    );
  }
  await categoryService.getCategoryById(categoryId);
  const updatedSubscription = await Subscription.findOneAndUpdate(
    { userId },
    {
      $pull: {
        categoryIds: new Types.ObjectId(categoryId),
      },
    },
    { new: true },
  );

  if (updatedSubscription && updatedSubscription.categoryIds.length === 0) {
    await Subscription.deleteOne({ userId });
  }

  return updatedSubscription;
};

const getMySubscriptions = async (
  userId: string,
): Promise<ISubscription | null> => {
  const subscription = await Subscription.findOne({ userId })
    .populate({
      path: 'categoryIds',
      select: 'name description isActive',
    })
    .lean();

  return subscription;
};

const getSubscribedUserByCategory = async (
  categoryId: string,
): Promise<ISubscribedUser[]> => {
  const subscriptions = await Subscription.find({
    categoryIds: new Types.ObjectId(categoryId),
  })
    .populate({
      path: 'userId',
      select: 'name email',
    })
    .select('userId')
    .lean();

  return subscriptions.map(sub => {
    const user = sub.userId as any;

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
  });
};


export const subscriptionService = {
  subscribeCategory,
  unsubscribeCategory,
  getMySubscriptions,
  getSubscribedUserByCategory,
};
