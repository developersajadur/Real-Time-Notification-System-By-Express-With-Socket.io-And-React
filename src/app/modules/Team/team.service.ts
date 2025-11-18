import status from 'http-status';
import AppError from '../../errors/AppError';
import { ITeam } from './team.interface';
import { TeamModel } from './team.model';
import { Types } from 'mongoose';

const createTeam = async (payload: Partial<ITeam>): Promise<ITeam> => {
  const team = await TeamModel.create(payload);
  return team;
};

const getUserTeams = async (owner: string): Promise<ITeam[]> => {
  if (!owner) {
    throw new AppError(status.BAD_REQUEST, 'Owner ID is required to fetch teams');
  }
  return await TeamModel.find({ owner }).sort({ createdAt: -1 });
};

const getTeamById = async (id: string): Promise<ITeam | null> => {
  const team = await TeamModel.findById(id);
  if (!team) throw new AppError(status.NOT_FOUND, 'Team not found');
  return team;
};

const updateTeam = async (
  id: string,
  tokenUserId: Types.ObjectId,
  payload: Partial<ITeam>,
): Promise<ITeam | null> => {
  if (payload.owner && payload.owner !== tokenUserId) {
    throw new AppError(status.FORBIDDEN, 'You are not allowed to change the owner of the team');
  }
  const updated = await TeamModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!updated) throw new AppError(status.NOT_FOUND, 'Team not found');
  return updated;
};

const deleteTeam = async (id: string, tokenUserId: Types.ObjectId): Promise<ITeam | null> => {
  const team = await TeamModel.findById(id);
  if (!team) {
    throw new AppError(status.NOT_FOUND, 'Team not found');
  }
  if (team.owner.toString() !== tokenUserId.toString()) {
    throw new AppError(status.FORBIDDEN, 'You are not allowed to delete this team');
  }
  const deleted = await TeamModel.findByIdAndDelete(id);
  if (!deleted) throw new AppError(status.NOT_FOUND, 'Team not found');
  return deleted;
};

export const teamService = {
  createTeam,
  getUserTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};
