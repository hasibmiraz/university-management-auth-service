import { Model, Types } from 'mongoose';
import { IFaculty } from '../faculty/faculty.interface';
import { IStudent } from '../student/student.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  admin?: Types.ObjectId;
  faculty?: Types.ObjectId | IFaculty;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
