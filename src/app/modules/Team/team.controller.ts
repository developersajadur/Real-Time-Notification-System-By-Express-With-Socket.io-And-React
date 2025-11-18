/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import status from 'http-status';
import { teamService } from './team.service';

const createTeam = catchAsync(async (req: any, res) => {
  const dataToSend = {
    ...req.body,
    owner: req.user?.userId,
  };
  if (!dataToSend.owner) return;
  const team = await teamService.createTeam(dataToSend);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Team created successfully',
    data: team,
  });
});

const getUserTeams = catchAsync(async (req, res) => {
  const teams = await teamService.getUserTeams(req.user?.userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Teams fetched successfully',
    data: teams,
  });
});

const getTeamById = catchAsync(async (req, res) => {
  const team = await teamService.getTeamById(req.params.teamId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Team fetched successfully',
    data: team,
  });
});

const updateTeam = catchAsync(async (req, res) => {
  const tokenUserId = req.user?.userId;
  const team = await teamService.updateTeam(
    req.params.teamId,
    tokenUserId,
    req.body,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Team updated successfully',
    data: team,
  });
});

const deleteTeam = catchAsync(async (req, res) => {
  const tokenUserId = req.user?.userId;
  await teamService.deleteTeam(req.params.teamId, tokenUserId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Team deleted successfully',
    data: null,
  });
});

export const teamController = {
  createTeam,
  getUserTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};
