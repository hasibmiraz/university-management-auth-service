import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiErrors';
import { PaginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { managementDepartmentSearchableFields } from './managementDepartment.constant';
import {
  IManagementDepartment,
  IManagementDepartmentFilters,
} from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';

const createDepartment = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment> => {
  const result = await ManagementDepartment.create(payload);
  return result;
};

const getAllDepartments = async (
  filters: IManagementDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IManagementDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelper.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: managementDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await ManagementDepartment.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await ManagementDepartment.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
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
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
