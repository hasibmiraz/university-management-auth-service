import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';

const loginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AuthService.loginUser(loginData);
    const { refreshToken, ...others } = result;

    // set refresh token to cookies
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<ILoginUserResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User login successful.',
      data: others,
    });
  }
);

const refreshToken: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await AuthService.refreshToken(refreshToken);

    // set refresh token to cookies
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<IRefreshTokenResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User login successful.',
      data: result,
    });
  }
);

const changePassword: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const { ...passwordData } = req.body;
    await AuthService.changePassword(user, passwordData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password changed successfully.',
    });
  }
);

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};
