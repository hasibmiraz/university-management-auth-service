import config from '../../../config';
import ApiError from '../../../errors/ApiErrors';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_student_password as string;
  }

  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  const id = await generateStudentId(academicSemester);
  user.id = id;

  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, `Failed to create new user.`);
  }

  return createdUser;
};

export const UserService = {
  createStudent,
};
