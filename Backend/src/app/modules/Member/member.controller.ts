import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import status from 'http-status';
import { memberService } from './member.service';

const createMember = catchAsync(async (req, res) => {
  const result = await memberService.createMember(req.body);

  sendResponse(res, {
    success: true,
    statusCode: status.CREATED,
    message: 'Member created successfully',
    data: result,
  });
});

const getMembers = catchAsync(async (req, res) => {
  const result = await memberService.getMembers();

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: 'Members fetched successfully',
    data: result,
  });
});

const getMember = catchAsync(async (req, res) => {
  const result = await memberService.getMemberById(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: 'Member fetched successfully',
    data: result,
  });
});

const updateMember = catchAsync(async (req, res) => {
  const result = await memberService.updateMember(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: 'Member updated successfully',
    data: result,
  });
});

const deleteMember = catchAsync(async (req, res) => {
  await memberService.deleteMember(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: 'Member deleted successfully',
    data: null,
  });
});

export const memberController = {
  createMember,
  getMembers,
  getMember,
  updateMember,
  deleteMember,
};
