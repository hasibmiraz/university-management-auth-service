import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from '../User/user.interface';
import { AuthService } from './auth.service';

export const loginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AuthService.loginUser(loginData);

    sendResponse<Partial<IUser>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User login successful.',
      data: result,
    });
  }
);

export const AuthController = {
  loginUser,
};
