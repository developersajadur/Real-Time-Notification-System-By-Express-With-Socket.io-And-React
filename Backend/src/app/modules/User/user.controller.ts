import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import status from 'http-status';
import { userService } from './user.service';

const CreateUser = catchAsync(async (req, res) => {
  const user = await userService.CreateUser(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'User Registered Successfully',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});




export const userController = {

  CreateUser
};
