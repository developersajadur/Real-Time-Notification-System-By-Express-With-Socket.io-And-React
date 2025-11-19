import status from 'http-status';
import AppError from '../../errors/AppError';
import { MemberModel } from './member.model';
import { IMember } from './member.interface';
import { TeamModel } from '../Team/team.model';

const createMember = async (payload: Partial<IMember>) => {
  const team = await TeamModel.findById(payload.team);

  if (!team) {
    throw new AppError(status.NOT_FOUND, 'Team not found');
  }

  const member = await MemberModel.create(payload);
  return member;
};

const getMembers = async () => {
  return await MemberModel.find()
    .populate('team', 'name')
    .sort({ createdAt: -1 });
};

const getMemberById = async (id: string) => {
  const member = await MemberModel.findById(id).populate('team', 'name');
  if (!member) throw new AppError(status.NOT_FOUND, 'Member not found');
  return member;
};

const updateMember = async (id: string, payload: Partial<IMember>) => {
  const updated = await MemberModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!updated) throw new AppError(status.NOT_FOUND, 'Member not found');
  return updated;
};

const deleteMember = async (id: string) => {
  const deleted = await MemberModel.findByIdAndDelete(id);
  if (!deleted) throw new AppError(status.NOT_FOUND, 'Member not found');
  return deleted;
};

export const memberService = {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
