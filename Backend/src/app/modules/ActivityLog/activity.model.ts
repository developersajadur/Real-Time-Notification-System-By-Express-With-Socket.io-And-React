import { Schema, model } from 'mongoose';
import { IActivityLog } from './activity.interface';

const activitySchema = new Schema<IActivityLog>(
  {
    message: { type: String, required: true },

    task: { type: Schema.Types.ObjectId, ref: 'Task' },

    fromMember: { type: Schema.Types.ObjectId, ref: 'Member' },

    toMember: { type: Schema.Types.ObjectId, ref: 'Member' },
  },
  {
    timestamps: true,
  },
);

export const ActivityLogModel = model<IActivityLog>(
  'ActivityLog',
  activitySchema,
);
