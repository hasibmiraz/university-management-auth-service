import { NextFunction, Request, Response } from 'express';
import status from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    sendResponse<IAcademicSemester>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Academic semester created successfully',
      data: result,
    });

    next();
  }
);

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicSemesterService.getAllSemesters(
      paginationOptions
    );

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Semester retrieved successfully.',
      meta: result.meta,
      data: result.data,
    });

    next();
  }
);

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
};
