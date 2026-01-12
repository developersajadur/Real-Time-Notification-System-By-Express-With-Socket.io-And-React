import { Schema, model } from 'mongoose';
import { ISubscription } from './subscription.interface';

const subscriptionSchema = new Schema<ISubscription>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      unique: true,
    },
    categoryIds: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Category',
        },
      ],
      validate: {
        validator: function (value: Schema.Types.ObjectId[]) {
          return value.length > 0;
        },
        message: 'At least one category must be subscribed',
      },
    },
  },
  {
    timestamps: true,
  },
);

export const Subscription = model<ISubscription>(
  'Subscription',
  subscriptionSchema,
);
