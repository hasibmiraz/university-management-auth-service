import status from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { PaginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(status.BAD_REQUEST, 'Invalid semester code.');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemesters = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip } =
    PaginationHelper.calculatePagination(paginationOptions);

  const result = await AcademicSemester.find({}, { __v: 0 })
    .sort()
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: { page, limit, total },
    data: result,
  };
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
};
