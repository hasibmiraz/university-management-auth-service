import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiErrors';
import { JwtHelpers } from '../../../helper/jwtHelpers';
import { User } from '../User/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');
  }

  const isMatched =
    isUserExist?.password &&
    (await User.isPasswordMatched(password, isUserExist?.password));

  if (!isMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password did not match.');
  }

  const { id: userId, role, needsPasswordChange } = isUserExist;

  const accessToken = JwtHelpers.createToken(
    {
      id: userId,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = JwtHelpers.createToken(
    {
      id: userId,
      role,
    },
    config.jwt.refrest_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken;
  try {
    verifiedToken = JwtHelpers.verifyToken(
      token,
      config.jwt.refrest_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  const { id } = verifiedToken;

  // check if user is available or not
  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // Create new access token
  const newAccessToken = JwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { accessToken: newAccessToken };
};

const changePassword = async (
  user: JwtPayload,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  const isUserExist = await User.findOne({ id: user.id }).select('+password');
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    oldPassword,
    isUserExist.password as string
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Old password incorrect.');
  }
  isUserExist.needsPasswordChange = false;
  isUserExist.password = newPassword;
  isUserExist.save();
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
