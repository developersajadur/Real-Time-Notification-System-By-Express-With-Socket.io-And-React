/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import AppError from '../../errors/AppError';
import { ITeam } from './team.interface';
import { TeamModel } from './team.model';
import { Types } from 'mongoose';
import { MemberModel } from '../Member/member.model';

const createTeam = async (
  payload: Partial<ITeam> & { members?: any[] },
): Promise<ITeam> => {
  const { name, members = [] } = payload;

  if (!name) {
    throw new AppError(status.BAD_REQUEST, 'Team name is required');
  }

  const team = await TeamModel.create({ name });

  if (members && Array.isArray(members) && members.length > 0) {
    const membersToInsert = members.map((m: any) => ({
      name: m.name,
      role: m.role,
      capacity: m.capacity,
      team: team._id,
    }));

    const createdMembers = await MemberModel.insertMany(membersToInsert);

    const memberIds = createdMembers.map((m) => m._id);
    await TeamModel.findByIdAndUpdate(team._id, {
      $set: { members: memberIds },
    });
  }

  const populatedTeam = await TeamModel.findById(team._id)
    .populate('members')
    .lean();

  return populatedTeam as ITeam;
};

const getUserTeams = async (user: string): Promise<ITeam[]> => {
  if (!user) {
    throw new AppError(
      status.BAD_REQUEST,
      'Owner ID is required to fetch teams',
    );
  }
  return await TeamModel.find({ owner: user }).sort({ createdAt: -1 });
};

const getTeamById = async (id: string): Promise<ITeam | null> => {
  const team = await TeamModel.findById(id);
  if (!team) throw new AppError(status.NOT_FOUND, 'Team not found');
  return team;
};

const updateTeam = async (
  id: string,
  tokenUserId: Types.ObjectId,
  payload: Partial<ITeam> & { members?: any[] },
): Promise<ITeam | null> => {
  // Prevent owner change
  if (payload.owner && payload.owner.toString() !== tokenUserId.toString()) {
    throw new AppError(
      status.FORBIDDEN,
      'You are not allowed to change the owner of the team',
    );
  }

  const team = await TeamModel.findById(id);
  if (!team) throw new AppError(status.NOT_FOUND, 'Team not found');

  // Update simple fields
  if (payload.name) team.name = payload.name;

  if (payload.members && Array.isArray(payload.members)) {
    const incoming = payload.members;

    const existingMembers = await MemberModel.find({ team: id }).lean();

    const incomingIds = new Set<string>();
    const updateOps: any[] = [];
    const newMembers: any[] = [];

    for (const m of incoming) {
      if (m._id) {
        incomingIds.add(m._id);

        updateOps.push({
          updateOne: {
            filter: { _id: m._id, team: id },
            update: {
              $set: {
                name: m.name,
                role: m.role,
                capacity: m.capacity,
              },
            },
          },
        });
      } else {
        newMembers.push({
          name: m.name,
          role: m.role,
          capacity: m.capacity,
          team: id,
        });
      }
    }

    // Delete removed members
    const toDelete = existingMembers
      .filter((m) => !incomingIds.has(m._id.toString()))
      .map((m) => m._id);

    if (toDelete.length > 0) {
      await MemberModel.deleteMany({ _id: { $in: toDelete } });
    }

    // Update existing members
    if (updateOps.length > 0) {
      await MemberModel.bulkWrite(updateOps);
    }

    // Insert new members
    let createdMembers: any[] = [];
    if (newMembers.length > 0) {
      createdMembers = await MemberModel.insertMany(newMembers);
    }

    // Final member IDs for the team
    team.set('members', [
      ...Array.from(incomingIds),
      ...createdMembers.map((m) => m._id.toString()),
    ]);
  }

  await team.save();

  return await TeamModel.findById(id).populate('members').lean();
};

const deleteTeam = async (
  id: string,
  tokenUserId: Types.ObjectId,
): Promise<ITeam | null> => {
  const team = await TeamModel.findById(id);
  if (!team) {
    throw new AppError(status.NOT_FOUND, 'Team not found');
  }
  if (team.owner.toString() !== tokenUserId.toString()) {
    throw new AppError(
      status.FORBIDDEN,
      'You are not allowed to delete this team',
    );
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
