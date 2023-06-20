import { findLastUserId } from '../../../helper/findUserLastId';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId =
    (await findLastUserId('student', 4)) || (0).toString().padStart(5, '0');
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  const newStudentId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${incrementedId}`;
  return newStudentId;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastUserId('faculty', 2)) || (0).toString().padStart(5, '0');

  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  const newFacultyId = `F-${incrementedId}`;
  return newFacultyId;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastUserId('admin', 2)) || (0).toString().padStart(5, '0');

  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  const newAdminId = `A-${incrementedId}`;
  return newAdminId;
};
