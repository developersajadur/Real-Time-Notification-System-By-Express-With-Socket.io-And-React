import status from 'http-status';
import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
import { UserModel } from './user.model';

const CreateUser = async (
  payload: Partial<IUser>
): Promise<IUser> => {
  const existing = await UserModel.findOne({ email: payload.email });
  if (existing) {
    throw new AppError(status.CONFLICT, 'Email already in use');
  }

  const user = await UserModel.create({
    ...payload,
    role: 'user',
  });

  return user;
};




export const userService = {
  CreateUser,
};
