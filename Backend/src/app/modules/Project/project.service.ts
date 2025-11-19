import status from 'http-status';
import AppError from '../../errors/AppError';
import { IProject } from './project.interface';
import { ProjectModel } from './project.model';
import { TeamModel } from '../Team/team.model';
import { Types } from 'mongoose';

const createProject = async (
  payload: Partial<IProject>,
  ownerId: string,
): Promise<IProject> => {
  const isTeamExist = await TeamModel.findById(payload.team);
  if (!isTeamExist) {
    throw new AppError(status.NOT_FOUND, 'Team not found');
  }

  const project = await ProjectModel.create({
    ...payload,
    owner: ownerId,
  });

  return project;
};

const getUserProjects = async (ownerId: string): Promise<IProject[]> => {
  return await ProjectModel.find({ owner: ownerId })
    .populate('team')
    .sort({ createdAt: -1 });
};

const getProjectById = async (id: string): Promise<IProject | null> => {
  const project = await ProjectModel.findById(id).populate('team');

  if (!project) {
    throw new AppError(status.NOT_FOUND, 'Project not found');
  }

  return project;
};

const updateProject = async (
  id: string,
  payload: Partial<IProject>,
): Promise<IProject | null> => {
  if (payload.team) {
    const isTeamExist = await TeamModel.findById(payload.team);
    if (!isTeamExist) {
      throw new AppError(status.NOT_FOUND, 'Team not found');
    }
  }

  const updated = await ProjectModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!updated) {
    throw new AppError(status.NOT_FOUND, 'Project not found');
  }

  return updated;
};

const deleteProject = async (
  id: string,
  user: Types.ObjectId,
): Promise<IProject | null> => {
  const isProjectExist = await ProjectModel.findById(id).lean();
  if (isProjectExist?.owner != user) {
    throw new AppError(status.NOT_FOUND, 'you can"t delete project');
  }
  const deleted = await ProjectModel.findByIdAndDelete(id);

  if (!deleted) {
    throw new AppError(status.NOT_FOUND, 'Project not found');
  }

  return deleted;
};

export const projectService = {
  createProject,
  getUserProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
