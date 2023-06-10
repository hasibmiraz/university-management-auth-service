import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
const routes: Router = Router();

const moduleRoutes = [
  { path: '/user', route: UserRoutes },
  { path: '/academic-semesters', route: AcademicSemesterRoutes },
  { path: '/academic-faculties', route: AcademicFacultyRoutes },
];

moduleRoutes.forEach(({ path, route }) => routes.use(path, route));

export default routes;
