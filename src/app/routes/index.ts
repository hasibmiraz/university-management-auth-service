import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { ManagementDepartmentRoutes } from '../modules/managementDepartment/managementDepartment.route';
import { StudentRoutes } from '../modules/student/student.route';
const routes: Router = Router();

const moduleRoutes = [
  { path: '/auth', route: AuthRoutes },
  { path: '/academic-semesters', route: AcademicSemesterRoutes },
  { path: '/academic-faculties', route: AcademicFacultyRoutes },
  { path: '/academic-departments', route: AcademicDepartmentRoutes },
  { path: '/management-departments', route: ManagementDepartmentRoutes },
  { path: '/user', route: UserRoutes },
  { path: '/students', route: StudentRoutes },
  { path: '/faculties', route: FacultyRoutes },
  { path: '/admins', route: AdminRoutes },
];

moduleRoutes.forEach(({ path, route }) => routes.use(path, route));

export default routes;
