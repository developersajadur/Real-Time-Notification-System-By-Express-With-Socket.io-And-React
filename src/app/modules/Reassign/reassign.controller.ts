import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import status from 'http-status';
import { reassignTasksService } from './reassign.service';

const reassignTasks = catchAsync(async (req, res) => {
  const logs = await reassignTasksService();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Reassignment completed',
    data: logs,
  });
});

export const reassignController = {
  reassignTasks,
};
