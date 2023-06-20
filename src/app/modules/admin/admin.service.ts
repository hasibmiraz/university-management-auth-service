import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';

const getSingleAdmin = async (id: string): Promise<IAdmin> => {
  const result = await Admin.findOne({ id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found.');
  }
  return result;
};

export const AdminService = {
  getSingleAdmin,
};
