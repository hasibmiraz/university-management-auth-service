/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../User/user.model';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';

const getSingleAdmin = async (id: string): Promise<IAdmin> => {
  const result = await Admin.findOne({ id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found.');
  }
  return result;
};

const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found.');
  }

  const { name, ...adminData } = payload;

  const updatedAdminData: Partial<IAdmin> = { ...adminData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate({ id }, updatedAdminData, {
    new: true,
  });
  return result;
};

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findOne({ id });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found.');
  }

  const session = mongoose.startSession();

  try {
    (await session).startTransaction();

    const admin = await Admin.findOneAndDelete({ id });

    if (!admin) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found.');
    }

    await User.deleteOne({ id });
    (await session).commitTransaction();
    (await session).endSession();
    return admin;
  } catch (error) {
    (await session).abortTransaction();
    throw error;
  }
};

export const AdminService = {
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
