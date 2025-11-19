/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivityLogModel } from './activity.model';
import { Types } from 'mongoose';

export const activityService = {
  async listActivity(params: {
    page?: number;
    limit?: number;
    taskId?: string;
    fromMember?: string;
    toMember?: string;
  }) {
    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? params.limit : 10;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (params.taskId) filter.task = new Types.ObjectId(params.taskId);
    if (params.fromMember)
      filter.fromMember = new Types.ObjectId(params.fromMember);
    if (params.toMember) filter.toMember = new Types.ObjectId(params.toMember);

    const [total, items] = await Promise.all([
      ActivityLogModel.countDocuments(filter),
      ActivityLogModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('task', 'title')
        .populate('fromMember', 'name')
        .populate('toMember', 'name')
        .lean(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      meta: {
        total,
        page,
        limit,
        totalPages,
      },

      data: items.map((r) => {
        const task: any = r.task;
        const from: any = r.fromMember;
        const to: any = r.toMember;

        return {
          _id: r._id,
          message: r.message,
          taskId: task?._id,
          taskTitle: task?.title,
          fromMemberId: from?._id,
          fromMemberName: from?.name,
          toMemberId: to?._id,
          toMemberName: to?.name,
          createdAt: r.createdAt,
        };
      }),
    };
  },
};
