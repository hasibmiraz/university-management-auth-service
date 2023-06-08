import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
const routes: Router = Router();

const moduleRoutes = [
  { path: '/user', route: UserRoutes },
  { path: '/academic-semesters', route: AcademicSemesterRoutes },
];

moduleRoutes.forEach(({ path, route }) => routes.use(path, route));

export default routes;
