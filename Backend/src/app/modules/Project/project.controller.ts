import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import status from 'http-status';
import { projectService } from './project.service';

const createProject = catchAsync(async (req, res) => {
  const project = await projectService.createProject(
    req.body,
    req.user!.userId,
  );

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Project created successfully',
    data: project,
  });
});

const getUserProjects = catchAsync(async (req, res) => {
  const projects = await projectService.getUserProjects(req.user!.userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Projects fetched successfully',
    data: projects,
  });
});

const getProjectById = catchAsync(async (req, res) => {
  const project = await projectService.getProjectById(req.params.projectId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Project fetched successfully',
    data: project,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const project = await projectService.updateProject(
    req.params.projectId,
    req.body,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Project updated successfully',
    data: project,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const project = await projectService.deleteProject(
    req.params.projectId,
    req.user?.userId,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Project deleted successfully',
    data: project,
  });
});

export const projectController = {
  createProject,
  getUserProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
