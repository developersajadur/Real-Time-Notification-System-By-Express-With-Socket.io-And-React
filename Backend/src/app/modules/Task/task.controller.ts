import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import status from 'http-status';
import { taskService } from './task.service';

const createTask = catchAsync(async (req, res) => {
  const task = await taskService.createTask(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Task created successfully',
    data: task,
  });
});

const getTasks = catchAsync(async (req, res) => {
  const tasks = await taskService.getTasks(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Tasks fetched successfully',
    data: tasks,
  });
});

const getTask = catchAsync(async (req, res) => {
  const task = await taskService.getTask(req.params.taskId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Task fetched successfully',
    data: task,
  });
});

const updateTask = catchAsync(async (req, res) => {
  const task = await taskService.updateTask(req.params.taskId, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Task updated successfully',
    data: task,
  });
});

const deleteTask = catchAsync(async (req, res) => {
  const task = await taskService.deleteTask(req.params.taskId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Task deleted successfully',
    data: task,
  });
});

export const taskController = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
