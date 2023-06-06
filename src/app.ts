import cors from 'cors';
import 'dotenv/config';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import userRouter from './app/modules/Users/user.route';

export const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/user', userRouter);

app.use(globalErrorHandler);
