/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IStudent } from '../student/student.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: boolean;
  student?: Types.ObjectId | IStudent;
  admin?: Types.ObjectId | IAdmin;
  faculty?: Types.ObjectId | IFaculty;
};

export type IUserMethods = {
  isUserExist(id: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
