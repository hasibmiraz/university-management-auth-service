import { Schema, Types, model } from 'mongoose';
import { facultyBloogGroup } from './faculty.constant';
import { FacultyModel, IFaculty } from './faculty.interface';

const facultySchema = new Schema<IFaculty>(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
      },
      lastName: {
        type: String,
        required: true,
      },
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: facultyBloogGroup,
    },
    designation: {
      type: String,
      required: true,
    },
    academicDepartment: {
      type: Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    academicFaculty: {
      type: Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Faculty = model<IFaculty, FacultyModel>('Faculty', facultySchema);
