import cors from 'cors';
import 'dotenv/config';
import express, { Application } from 'express';

import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import routes from './app/routes';

export const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1', routes);

// Global error handler
app.use(globalErrorHandler);

// Not found route handler
app.use(notFound);
