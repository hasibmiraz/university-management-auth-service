import { Request, RequestHandler, Response } from 'express';
import status from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

export const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...user } = req.body;
    const result = await UserService.createStudent(student, user);

    sendResponse<IUser>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  }
);

export const createFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...user } = req.body;
    const result = await UserService.createFaculty(faculty, user);

    sendResponse<IUser>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Faculty created successfully',
      data: result,
    });
  }
);

export const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...user } = req.body;
    const result = await UserService.createAdmin(admin, user);

    sendResponse<IUser>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Admin created successfully',
      data: result,
    });
  }
);

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
