import cors from 'cors';
import 'dotenv/config';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/User/user.route';
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route';

export const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/user', UserRoutes);
app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);

app.use(globalErrorHandler);
