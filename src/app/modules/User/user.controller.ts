import { NextFunction, Request, Response } from 'express';
import status from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...user } = req.body;
    const result = await UserService.createUserToDB(user);

    next();

    sendResponse<IUser>(res, {
      statusCode: status.OK,
      success: true,
      message: 'User created successfully',
      data: result,
    });
  }
);

export const UserController = { createUser };
