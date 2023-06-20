import { Model, Types } from 'mongoose';
import { IBloodGroup, IGender } from '../../../interfaces/user';

type IAdminName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type IAdmin = {
  id: string;
  name: IAdminName;
  profileImage?: string;
  dateOfBirth: string;
  gender: IGender;
  dateOfbirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  department: string;
  designation: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup: IBloodGroup;
  managementDepartment: Types.ObjectId;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;
