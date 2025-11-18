import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import status from 'http-status';
import { dashboardService } from './dashboard.service';

const getSummary = catchAsync(async (req, res) => {
  // optional query.teamId to scope
  const ownerId = req.user!.userId.toString();
  const teamId = req.query.teamId as string | undefined;

  const data = await dashboardService.getSummary(ownerId, teamId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Dashboard summary fetched successfully',
    data,
  });
});

export const dashboardController = {
  getSummary,
};
