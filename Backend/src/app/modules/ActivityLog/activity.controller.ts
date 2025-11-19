import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import status from 'http-status';
import { activityService } from './activity.service';

const listActivity = catchAsync(async (req, res) => {
  const page =
    typeof req.query.page === 'string' ? Number(req.query.page) : undefined;
  const limit =
    typeof req.query.limit === 'string' ? Number(req.query.limit) : undefined;

  const result = await activityService.listActivity({
    page,
    limit,
    taskId: req.query.taskId as string | undefined,
    fromMember: req.query.fromMember as string | undefined,
    toMember: req.query.toMember as string | undefined,
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Activity logs fetched successfully',
    data: result,
  });
});

export const activityController = {
  listActivity,
};
