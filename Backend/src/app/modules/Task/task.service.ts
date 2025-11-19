/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import AppError from '../../errors/AppError';
import { TaskModel } from './task.model';
import { ITask } from './task.interface';
import { autoAssignMember } from './task.utils';
import { ProjectModel } from '../Project/project.model';
import { MemberModel } from '../Member/member.model';
import { ActivityLogModel } from '../ActivityLog/activity.model';

const createTask = async (payload: Partial<ITask>): Promise<ITask> => {
  // Validate assigned user
  if (payload.assignedTo) {
    const isAssignedUserExist = await MemberModel.findById(payload.assignedTo);
    if (!isAssignedUserExist) {
      throw new AppError(status.NOT_FOUND, 'Assigned member not found');
    }
  }

  // Validate project
  const isProjectExist = await ProjectModel.findById(payload.project);
  if (!isProjectExist) {
    throw new AppError(status.NOT_FOUND, 'Project not found');
  }

  let assignedMemberId = payload.assignedTo;

  // Auto Assign if assignedTo not provided
  if (!payload.assignedTo) {
    const autoAssigned = await autoAssignMember(payload.project!.toString());
    payload.assignedTo = autoAssigned;
    assignedMemberId = autoAssigned;
  }

  // Create Task
  const task = await TaskModel.create(payload);

  // --------------------------
  // Create Activity Log
  // --------------------------

  if (assignedMemberId) {
    const member = await MemberModel.findById(assignedMemberId).select('name');

    await ActivityLogModel.create({
      message: payload.assignedTo
        ? `Task "${task.title}" assigned to ${member?.name}`
        : `Task "${task.title}" auto-assigned to ${member?.name}`,
      task: task._id,
      toMember: assignedMemberId,
    });
  }

  return task;
};

const getTasks = async (query: any): Promise<ITask[]> => {
  const filter: any = {};

  if (query.project) filter.project = query.project;
  if (query.member) filter.assignedTo = query.member;
  if (query.status) filter.status = query.status;

  return await TaskModel.find(filter)
    .populate('assignedTo')
    .populate('project')
    .sort({ createdAt: -1 });
};

const getTask = async (taskId: string): Promise<ITask | null> => {
  const task = await TaskModel.findById(taskId)
    .populate('assignedTo')
    .populate('project');

  if (!task) throw new AppError(status.NOT_FOUND, 'Task not found');
  return task;
};

const updateTask = async (
  taskId: string,
  payload: Partial<ITask>,
): Promise<ITask | null> => {
  // STEP 1: Get old task (populated)
  const oldTaskRaw = await TaskModel.findById(taskId)
    .populate('assignedTo', 'name')
    .lean();

  if (!oldTaskRaw) {
    throw new AppError(status.NOT_FOUND, 'Task not found');
  }

  // ---- SAFE TYPE CAST ----
  const oldTask = oldTaskRaw as unknown as {
    _id: string;
    title: string;
    status: string;
    priority: string;
    assignedTo?: { _id: string; name: string } | null;
  };

  // STEP 2: Update task
  const updatedRaw = await TaskModel.findByIdAndUpdate(taskId, payload, {
    new: true,
    runValidators: true,
  }).populate('assignedTo', 'name');

  if (!updatedRaw) {
    throw new AppError(status.NOT_FOUND, 'Task not found');
  }

  // ---- SAFE TYPE CAST ----
  const updated = updatedRaw as unknown as {
    _id: string;
    title: string;
    status: string;
    priority: string;
    assignedTo?: { _id: string; name: string } | null;
  };

  // STEP 3: Detect changes — create logs
  const logs: any[] = [];

  // 3.1: Member change
  if (
    payload.assignedTo &&
    String(payload.assignedTo) !== String(oldTask.assignedTo?._id)
  ) {
    const newMember = await MemberModel.findById(payload.assignedTo).select(
      'name',
    );

    logs.push({
      message: `Task "${updated.title}" reassigned from ${oldTask.assignedTo?.name || 'Unassigned'} to ${newMember?.name}`,
      task: updated._id,
      fromMember: oldTask.assignedTo?._id,
      toMember: updated.assignedTo?._id,
    });
  }

  // 3.2: Status change
  if (payload.status && payload.status !== oldTask.status) {
    logs.push({
      message: `Task "${updated.title}" status changed from ${oldTask.status} to ${payload.status}`,
      task: updated._id,
    });
  }

  // 3.3: Priority change
  if (payload.priority && payload.priority !== oldTask.priority) {
    logs.push({
      message: `Task "${updated.title}" priority changed from ${oldTask.priority} to ${payload.priority}`,
      task: updated._id,
    });
  }

  // 3.4: Title change
  if (payload.title && payload.title !== oldTask.title) {
    logs.push({
      message: `Task title changed from "${oldTask.title}" to "${payload.title}"`,
      task: updated._id,
    });
  }

  // STEP 4: Save logs
  if (logs.length > 0) {
    await ActivityLogModel.insertMany(logs);
  }

  return updatedRaw;
};

const deleteTask = async (taskId: string): Promise<ITask | null> => {
  const deleted = await TaskModel.findByIdAndDelete(taskId);

  if (!deleted) throw new AppError(status.NOT_FOUND, 'Task not found');
  return deleted;
};

export const taskService = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
