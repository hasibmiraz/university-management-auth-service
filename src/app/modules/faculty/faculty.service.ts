/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../User/user.model';
import { IFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

const getSingleFaculty = async (id: string): Promise<IFaculty> => {
  const result = await Faculty.findOne({ id })
    .populate('academicDepartment')
    .populate('academicFaculty');

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found.');
  }
  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found.');
  }

  const { name, ...facultyData } = payload;

  const updatedFacultyData: Partial<IFaculty> = { ...facultyData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  });
  return result;
};

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ id });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found.');
  }

  const session = mongoose.startSession();

  try {
    (await session).startTransaction();

    const faculty = await Faculty.findOneAndDelete({ id });

    if (!faculty) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found.');
    }

    await User.deleteOne({ id });
    (await session).commitTransaction();
    (await session).endSession();
    return faculty;
  } catch (error) {
    (await session).abortTransaction();
    throw error;
  }
};

export const FacultyService = {
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
