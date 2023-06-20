import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { IManagementDepartment } from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';

const createDepartment = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment> => {
  const result = await ManagementDepartment.create(payload);
  return result;
};

const getSingleDepartment = async (
  id: string
): Promise<IManagementDepartment> => {
  const result = await ManagementDepartment.findById(id);
  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Management department not found.'
    );
  }
  return result;
};

const updateDepartment = async (
  id: string,
  payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Management department not found.'
    );
  }

  return result;
};

const deleteDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Management department not found.'
    );
  }
  return result;
};

export const ManagementDepartmentService = {
  createDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
