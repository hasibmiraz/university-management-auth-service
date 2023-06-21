import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { IUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<Partial<IUser>> => {
  const { id, password } = payload;
  const user = new User();
  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');
  }

  const isMatched =
    isUserExist?.password &&
    (await user.isPasswordMatched(password, isUserExist?.password));

  if (!isMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password did not match.');
  }

  return isUserExist;
};

export const AuthService = {
  loginUser,
};
